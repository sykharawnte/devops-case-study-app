const express = require("express");
const app = express();
const port = 3000;

// Mock metadata (in real CI/CD, Jenkins/GitHub Actions can inject these via env variables)
const buildInfo = {
  version: "1.0.3",
  gitCommit: "a7f9b21",
  environment: process.env.NODE_ENV || "Development",
  deployedAt: new Date().toLocaleString(),
};

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Deployment Info</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card {
          background: #fff;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
          width: 400px;
        }
        h1 {
          color: #0077b6;
          margin-bottom: 1rem;
        }
        .info {
          margin: 1rem 0;
          padding: 0.7rem;
          border-radius: 10px;
          background: #f8f9fa;
          font-weight: 500;
        }
        .info span {
          color: #0077b6;
          font-weight: 700;
        }
        .footer {
          margin-top: 2rem;
          font-size: 0.9rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Deployment Info</h1>
        <div class="info">App Version: <span>${buildInfo.version}</span></div>
        <div class="info">Git Commit: <span>${buildInfo.gitCommit}</span></div>
        <div class="info">Environment: <span>${buildInfo.environment}</span></div>
        <div class="info">Deployed At: <span>${buildInfo.deployedAt}</span></div>
        <div class="footer">Server running at http://localhost:${port}</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`✅ App running at http://localhost:${port}`);
});
