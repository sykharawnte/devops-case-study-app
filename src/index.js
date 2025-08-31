const express = require("express");
const os = require("os");
const app = express();
const port = 3000;

// API endpoint for stats
app.get("/stats", (req, res) => {
  const cpuLoad = os.loadavg()[0].toFixed(2);
  const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
  const usedMem = (totalMem - freeMem).toFixed(2);
  const uptime = (os.uptime() / 3600).toFixed(2);

  res.json({ cpuLoad, totalMem, freeMem, usedMem, uptime });
});

// Serve frontend in same file
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>System Monitoring Dashboard</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #43cea2, #185a9d);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .dashboard {
          background: #fff;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          text-align: center;
          width: 450px;
        }
        h1 {
          color: #185a9d;
          margin-bottom: 1.5rem;
        }
        .stat {
          margin: 1rem 0;
          padding: 1rem;
          border-radius: 12px;
          background: #f4f6f9;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .stat span {
          color: #43cea2;
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
      <div class="dashboard">
        <h1>🖥️ Live System Monitoring</h1>
        <div class="stat">CPU Load: <span id="cpu">--</span></div>
        <div class="stat">Memory Used: <span id="used">--</span> / <span id="total">--</span> GB</div>
        <div class="stat">Free Memory: <span id="free">--</span> GB</div>
        <div class="stat">System Uptime: <span id="uptime">--</span> hours</div>
        <div class="footer">Server running at http://localhost:${port}</div>
      </div>

      <script>
        async function fetchStats() {
          const res = await fetch("/stats");
          const data = await res.json();
          document.getElementById("cpu").innerText = data.cpuLoad;
          document.getElementById("used").innerText = data.usedMem;
          document.getElementById("total").innerText = data.totalMem;
          document.getElementById("free").innerText = data.freeMem;
          document.getElementById("uptime").innerText = data.uptime;
        }

        fetchStats();
        setInterval(fetchStats, 5000); // refresh every 5s
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`✅ Dashboard running at http://localhost:${port}`);
});
