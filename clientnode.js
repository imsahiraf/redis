const WebSocket = require('ws');
const http = require('http');

const username = 'mrzulf';
const password = 'pass@123';
const numArr = [1, 2];
const num = numArr[(Math.floor(Math.random() * numArr.length))];
console.log('The data Selected now is', num);
const dataArr = ['numbers', 'alphabets'];
const channels = [];

for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * dataArr.length);
    channels.push(dataArr[randomIndex]);
}
console.log(channels)

const postData = JSON.stringify({ username, password });

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const token = (data);
        console.log(token);
        WsConnect(token);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(postData);
req.end();

function WsConnect(token) {
    const client = new WebSocket('ws://localhost:8081', {
        headers: { Authorization: `Bearer ${token}` }
    });

    client.on('open', () => {
        console.log('WebSocket Client Connected');
        client.send(JSON.stringify({ token, channels }));
    });

    client.on('error', (error) => {
        console.error('Connection Error:', error.toString());
    });

    client.on('close', () => {
        console.log('WebSocket Client Disconnected');
    });

    client.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);
        console.log(`Here the random generated number for a second is ${data}`);
    });
}
