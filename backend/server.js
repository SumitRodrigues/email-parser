const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per window
}));

// Enhanced CORS Configuration
const allowedOrigins = [
  'https://email-parser-k288jxrhg-sumit-rodrigues-projects.vercel.app',
  'https://email-parser.vercel.app',
  'http://localhost:3000' // For local development
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(bodyParser.json());

// LinkedIn API Config
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_API_ENDPOINT = 'https://api.linkedin.com/v2';

// Email Parsing Functions
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function parseEmail(email) {
  const [localPart] = email.split('@');
  const parts = localPart.split(/[._-]/);
  return {
    firstName: parts[0] ? capitalize(parts[0]) : '',
    lastName: parts.slice(1).join(' ') ? capitalize(parts.slice(1).join(' ')) : ''
  };
}

// LinkedIn Integration
async function getLinkedInProfile(profileUrl) {
    try {
      // Improved URL validation
      const regex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)\/?/;
      const matches = profileUrl.match(regex);
      if (!matches) throw new Error('Invalid LinkedIn URL format');
  
      // Get access token using authorization code flow
      const authResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: 'AUTHORIZATION_CODE', // Should come from frontend OAuth flow
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET
        })
      );
  
      // Get profile data with proper headers
      const profileResponse = await axios.get(
        `${LINKEDIN_API_ENDPOINT}/userinfo`,
        {
          headers: {
            'Authorization': `Bearer ${authResponse.data.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      return {
        firstName: profileResponse.data.given_name,
        lastName: profileResponse.data.family_name,
        jobTitle: profileResponse.data.name,
        profilePicture: profileResponse.data.picture
      };
      
    } catch (error) {
      console.error('LinkedIn API Error Details:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      throw new Error(error.response?.data?.error_description || 'Profile fetch failed');
    }
  }

// API Endpoints
app.post('/api/process-emails', (req, res) => {
    try {
      console.log('Received emails:', req.body.emails); // Add logging
      
      if (!Array.isArray(req.body.emails)) {
        return res.status(400).json({ error: 'Invalid input format' });
      }
  
      const emails = req.body.emails
        .map(email => email.trim())
        .filter(email => {
          const isValid = /\S+@\S+\.\S+/.test(email);
          console.log(`Email validation: ${email} => ${isValid}`);
          return isValid;
        });
  
      console.log('Valid emails:', emails);
      
      const results = emails.map(email => ({
        email,
        ...parseEmail(email)
      }));
  
      res.json({ results });
    } catch (error) {
      console.error('Processing error:', error); // Detailed error log
      res.status(500).json({ error: 'Error processing emails' });
    }
  });

app.post('/api/process-linkedin', async (req, res) => {
  try {
    const { linkedinUrl } = req.body;
    const profileData = await getLinkedInProfile(linkedinUrl);
    res.json(profileData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});