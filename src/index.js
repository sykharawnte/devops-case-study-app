const express = require("express");
const os = require("os");
const app = express();
const port = 3000;

// Random DevOps quotes
const quotes = [
  "Automate everything, but trust nothing!",
  "Infrastructure as Code is the future 🚀",
  "In DevOps, feedback loops are everything 🔄",
  "Continuous Integration > Occasional Frustration 😅",
  "Cloud + Automation = Magic ✨"
];

app.get("/", (req, res) => {
  const cpuLoad = os.loadavg()[0].toFixed(2);
  const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
  const uptime = (os.uptime() / 3600).toFixed(2);

  // Pick a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>DevOps Dashboard</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            background: #f0f4f9; 
            color: #333; 
            padding: 40px;
          }
          h1 { color: #2c3e50; }
          .card {
            background: white;
            padding: 20px;
            margin: 20px auto;
            width: 400px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .quote {
            font-style: italic;
            color: #16a085;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <h1>🚀 DevOps Case Study Project</h1>
        <h3>By Shubhada Kharwante</h3>
        <p>Deployed with Terraform, Docker, Ansible, and Jenkins</p>

        <div class="card">
          <h2>📊 Server Stats</h2>
          <p><b>CPU Load:</b> ${cpuLoad}</p>
          <p><b>Total Memory:</b> ${totalMem} GB</p>
          <p><b>Free Memory:</b> ${freeMem} GB</p>
          <p><b>Uptime:</b> ${uptime} hrs</p>
        </div>

        <div class="card">
          <h2>💡 DevOps Quote</h2>
          <p class="quote">"${randomQuote}"</p>
        </div>

        <p>Server running at port ${port}</p>
        <p>${new Date()}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
