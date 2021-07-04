const http = require('http');

http.createServer((req, res) => {
    let body = [];
    req.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        // 暂存到body数组里
        body.push(chunk.toString());
    }).on('end', () => {
        // 把数据拼起来
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        // 这里并不需要根据req来处理数据，所以这里是直接写死一个response的值
        res.writeHead(200, {'Content-Type': 'text/html'});
        // 随便写一段body的代码
        res.end(' Hello World\n');
    })
});