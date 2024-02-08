const express = require('express');
// const proxy = require('http-proxy-middleware');
var httpProxy = require('http-proxy');
const app = express();
var proxy = httpProxy.createProxyServer({});
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});
const PORT = '9000'
// 静态页面
// 这里一般设置你的静态资源路径
// const target = 'https://738298e40e1a3e07cd.gradio.live'
// const target = 'https://yao0713-far.hf.space'
const target ='https://13cb70c57cb8fd7a35.gradio.live'


app.use('/', express.static('static'));
// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test

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