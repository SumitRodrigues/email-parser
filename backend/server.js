const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

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
    const regex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
    const matches = profileUrl.match(regex);
    if (!matches) throw new Error('Invalid LinkedIn URL');

    const profileId = matches[1];
    
    const authResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      })
    );

    const profileResponse = await axios.get(
      `${LINKEDIN_API_ENDPOINT}/people/(vanityName:${profileId})?projection=(id,profilePicture(displayImage~:playableStreams),firstName,lastName,headline)`,
      {
        headers: {
          'Authorization': `Bearer ${authResponse.data.access_token}`
        }
      }
    );

    return {
      firstName: profileResponse.data.firstName?.localized?.en_US,
      lastName: profileResponse.data.lastName?.localized?.en_US,
      jobTitle: profileResponse.data.headline?.localized?.en_US,
      profilePicture: profileResponse.data.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier
    };
  } catch (error) {
    console.error('LinkedIn API Error:', error);
    throw new Error('Failed to fetch LinkedIn profile');
  }
}

// API Endpoints
app.post('/api/process-emails', (req, res) => {
  try {
    const emails = req.body.emails
      .map(email => email.trim())
      .filter(email => /\S+@\S+\.\S+/.test(email));

    const results = emails.map(email => ({
      email,
      ...parseEmail(email)
    }));

    res.json({ results });
  } catch (error) {
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