const http = require('http');

const PORT = 3000;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('X-Powered-By', 'Node.js HTTP Module');

    res.write('Node.js server is running successfully.\n');
    res.write(`Request Method: ${req.method}\n`);
    res.write(`Request URL: ${req.url}\n`);

    res.end('Response sent using write() and end().\n');
});

server.listen(PORT, HOST, () => {
    console.log(`Exercise 1 server running at http://${HOST}:${PORT}`);
    console.log('Open the URL in a browser to verify the response.');
});

server.on('error', (error) => {
    console.error('Server failed to start:', error.message);
});
