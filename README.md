# Email Name Extractor

```markdown
A full-stack application that extracts first and last names from email addresses, with CSV export capabilities.

![Demo Screenshot]

<img width="1385" alt="Screenshot 2025-03-15 at 10 29 07 PM" src="https://github.com/user-attachments/assets/98e99bae-4af8-40f0-8d1f-cf8a7f729ea9" />

## Features

- 📧 Email parsing from local-part
- 📥 CSV download for first/last names
- 🎨 Modern UI with dark theme
- ✨ Interactive 3D animations
- 📱 Responsive design
- 🔒 Secure CORS configuration
- ⚡ Fast API processing

## Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Installation

### Prerequisites
- Node.js v18+
- npm v9+

### Local Development

1. **Clone repository**
   ```bash
   git clone https://github.com/SumitRodrigues/email-parser.git
   cd email-parser
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   npm start
   ```

## Deployment

### Frontend (Vercel)
1. Set `REACT_APP_API_URL` environment variable
2. Connect GitHub repository
3. Deploy from main branch

### Backend (Render)
1. Create Web Service with Node.js environment
2. Set environment variables:
   ```env
   PORT=10000
   NODE_ENV=production
   ```
3. Set build command: `npm install`
4. Set start command: `npm start`

## Project Structure

```
email-parser/
├── backend
│   ├── server.js        # Express API
│   ├── package.json
│   └── Procfile
└── frontend
    ├── public
    ├── src
    │   ├── App.js       # Main component
    │   └── ...          # Other components
    └── package.json
```

## API Documentation

**Endpoint**: `POST /api/process-emails`

**Request Body**:
```json
{
  "emails": ["john.doe@example.com", "jane_smith@domain.com"]
}
```

**Response**:
```json
{
  "results": [
    {
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  ]
}
```

## Troubleshooting

**CORS Errors**:
- Verify allowed origins in `server.js`
- Ensure frontend URL is in CORS config

**Port Binding Issues**:
- Use `PORT=10000` in production
- Bind to `0.0.0.0` host

**Deployment Failures**:
- Check build logs in Render/Vercel
- Verify `package.json` exists in correct directory

## License

[MIT License](LICENSE)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Author**: Sumit Rodrigues  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SumitRodrigues)  
**Live Demo**: [https://email-parser.vercel.app](https://email-parcel.vercel.app)  
**Contact**: [your.email@domain.com](mailto:your.email@domain.com)
```

This README includes:
- Modern badge styling
- Clear installation/deployment steps
- API documentation
- Troubleshooting common issues
- Responsive design elements
- License and contribution guidelines
- Social badges
- Placeholders for your actual URLs and contact info

To use it:
1. Create `LICENSE` file (optional)
2. Replace placeholder URLs with your actual deployment URLs
3. Add real screenshots
4. Update contact information
5. Save as `README.md` in your repository root
