# Email Name Extractor

```markdown
A simple web application that extracts first and last names from email addresses. You can also download the results as a CSV file.


## 🌟 Features

- Extract first and last names from email addresses
- Download parsed data as CSV
- Clean and modern user interface
- Responsive design for mobile and desktop
- Fast backend API using Node.js and Express


## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Deployment**: Vercel (Frontend), Render (Backend)


## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Run Locally

#### 1. Clone the repository

```bash
git clone https://github.com/SumitRodrigues/email-parser.git
cd email-parser
```

#### 2. Start the backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

#### 3. Start the frontend

```bash
cd ../frontend
npm install
cp .env.example .env
npm start
```

> The frontend should connect to the backend using the `REACT_APP_API_URL` variable in `.env`.


## 🌐 Deployment

### Frontend (Vercel)

- Set environment variable: `REACT_APP_API_URL`
- Connect GitHub repository
- Deploy from `main` branch

### Backend (Render)

- Create a new Web Service
- Set environment variables:
  ```env
  PORT=10000
  NODE_ENV=production
  ```
- Build command: `npm install`
- Start command: `npm start`

---

## 📦 API Overview

### POST `/api/process-emails`

#### Request

```json
{
  "emails": ["john.doe@example.com", "jane_smith@domain.com"]
}
```

#### Response

```json
{
  "results": [
    {
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    {
      "email": "jane_smith@domain.com",
      "firstName": "Jane",
      "lastName": "Smith"
    }
  ]
}
```

---

## 📁 Project Structure

```
email-parser/
├── backend       # Node.js API
└── frontend      # React frontend
```

---

## ❓ Troubleshooting

- **CORS Issues**: Check allowed origins in `server.js`
- **Frontend not connecting**: Make sure `REACT_APP_API_URL` is set correctly
- **Port issues**: Use `PORT=10000` and bind to `0.0.0.0`

---

## 👨‍💻 Author

**Sumit Rodrigues**

- GitHub: [@SumitRodrigues](https://github.com/SumitRodrigues)
- Live Demo: [Click Here](https://email-parser-k288jxrhg-sumit-rodrigues-projects.vercel.app/)
- Contact: [sumitrod11@gmail.com](mailto:sumitrod11@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes
4. Commit: `git commit -m "Add YourFeature"`
5. Push: `git push origin feature/YourFeature`
6. Open a Pull Request
```
