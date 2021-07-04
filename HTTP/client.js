const net = require('net');

class Request {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;  // default port for HTTP
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            // HTTP has to have a Content-Type header
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body);
        else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded')
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        // 若这个length传的不对，HTTP请求就会是一个非法的请求，所以这里直接从内部计算出length
        this.headers['Content-Length'] = this.bodyText.length;
    }

    send() {
        return new Promise((resolve, reject) => {
            // 逐步接受responsne文本并进行分析
            const parser = new ResponseParser;
            resolve('');
        });
    }
}

void async function() {
    let req = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'alice'
        }
    });

    let res = await req.send();

    console.log(res);
}

class ResponseParser {
    constructor() {
    }
    receive(s) {
        for(let i = 0; i < s.length; i++) {
            this.receiveChar(s.charAt(i));
        }
    }
    receiveChar(char) {
        // ...
    }
}