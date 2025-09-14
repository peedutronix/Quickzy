// Simplified version without dependencies
const http = require('http');
const fs = require('fs');
const path = require('path');

// In-memory storage for quotes since we can't use MongoDB
const quotes = [];

// Parse PORT from .env file or use default
let PORT = 5000;
try {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  const portMatch = envContent.match(/PORT=(\d+)/);
  if (portMatch && portMatch[1]) {
    PORT = parseInt(portMatch[1]);
  }
} catch (err) {
  console.log('Using default PORT 5000');
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // Handle API endpoints
  if (req.url === '/api/quotes' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const quoteData = JSON.parse(body);
        const { name, email, phone, message, serviceType } = quoteData;
        
        // Validate required fields
        if (!name || !email || !phone || !message || !serviceType) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'All fields are required' }));
        }
        
        // Create new quote with timestamp
        const newQuote = {
          id: Date.now().toString(),
          name,
          email,
          phone,
          message,
          serviceType,
          createdAt: new Date()
        };
        
        // Save to in-memory storage
        quotes.push(newQuote);
        
        // Send success response
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(newQuote));
      } catch (err) {
        console.error('Error processing request:', err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid request data' }));
      }
    });
  } 
  // GET all quotes
  else if (req.url === '/api/quotes' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(quotes));
  }
  // Serve static files from frontend directory
  else {
    const frontendPath = path.join(__dirname, '..', 'frontend');
    const filePath = path.join(frontendPath, req.url === '/' ? 'index.html' : req.url);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'Not found' }));
      }
      
      // Set content type based on file extension
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      switch (ext) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (No MongoDB)`);
});