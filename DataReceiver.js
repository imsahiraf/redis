const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });
const mongoose = require('mongoose');
const Redis = require('ioredis');

const secret = 'my_secret_key';

// Logged in users array
var loggedInUsers = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/websocketdemo');

// Define the user schema
const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

// Create the user model
const User = mongoose.model('User', userSchema);

app.post('/login', function (req, res) {
	const { username, password } = req.body;

	User.findOne({ username })
		.then(user => {
			if (!user) {
				res.status(401).send('Invalid username or password');
				return;
			} else {
				// First check if the user is already logged in or not
				if (user.username && loggedInUsers.includes(user.username)) {
					res.status(402).send('You are already logged in!');
				} else if (user && user.password === password) {
					// Generate JWT token with a secret key and set the token as a cookie
					const token = jwt.sign({ username }, secret);
					res.status(200).send(token);
				} else {
					res.status(401).send('Invalid username or password');
				}
			}
			console.log(user.username)
		})
		.catch(err => {
			console.error(err);
			res.status(500).send('Error retrieving user from database');
		});
});

wss.on('connection', function connection(ws, req) {
	// Wait for the initial message from the client containing the username and password
	ws.once('message', function incoming(message) {
		const data = JSON.parse(message);
		const { token, channels } = data;

		if (!token) {
			console.log(token)
			ws.close();
			return;
		}

		jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				console.log(err);
				ws.close();
				return;
			}

			console.log('Token verified:', decoded);

			// Add the user to the list of logged in users
			const user = decoded.username;
			if (user) {
				loggedInUsers.push(user);
			} else {
				console.log(`User ${decoded.username} not found in database`);
			}

			console.log(loggedInUsers)

			const redisSubscriber = new Redis();
			redisSubscriber.subscribe(channels);

			redisSubscriber.on('message', (channel, message) => {
				ws.send(JSON.stringify(message));
				console.log(`Received data from channel ${channel}: ${message}`);
			});

			ws.on('close', function close() {
				console.log('Client disconnected');
				// Remove the user from the list of logged in users
				const index = loggedInUsers.findIndex(u => u === decoded.username);
				if (index !== -1) {
					loggedInUsers.splice(index, 1);
				}
			});
		});
	});
});

app.listen(8080, function () {
	console.log('Server started on port 8080');
});
