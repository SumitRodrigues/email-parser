const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});