const express = require('express');
const httpProxy = require('http-proxy');
const logMiddleware = require('./log');
const app = express();
const proxy = httpProxy.createProxyServer({});
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});
const PORT = '9000'
const target = 'http://127.0.0.1:7860'

app.use('/', express.static('static'));
app.use(logMiddleware)

app.use('/', (req, res) => {
  proxy.web(req, res, {
    target,
    changeOrigin: true,
    ws: true
  });
})

// 监听端口
app.listen(PORT, () => {
  console.log(`server running @${PORT}`);
});