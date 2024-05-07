const https = require('https');
const fs = require('fs');

// Load the Let's Encrypt certificate and private key
const cert = fs.readFileSync('/etc/letsencrypt/live/oakgame.tech/fullchain.pem', 'utf8');
const key = fs.readFileSync('/etc/letsencrypt/live/oakgame.tech/privkey.pem', 'utf8');

// Create an HTTPS server
const server = https.createServer({
  key,
  cert,
});

// Define a test route
server.on('request', (req, res) => {
  if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running successfully!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

// Start the server
const port = 22; // or any other available port
server.listen(port, () => {
  console.log(`Server started on https://oakgame.tech:${port}`);
});