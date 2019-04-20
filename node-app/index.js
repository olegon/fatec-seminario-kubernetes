const express = require('express');
const os = require('os');

const app = express();
const hostname = os.hostname();

app.get('/', (req, res) => {
  res.send(`Hello from ${hostname}`);
});

app.get('/shutdown', (req, res) => {
  res.end('Shutting down...');
  process.exit(1);
});

app.listen(5000);
