const express = require('express');
const path = require('path');
const https = require('https');
const xss = require('xss');
const app = express();
require('dotenv').config();
const api_key = process.env.MAILCHIMP_API_KEY;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/index.html', (req, res) => {
	console.log(req.body);
	res.send('Thank You!');
});

app.listen(3000, function(){
	console.log('Server started on port 3000');
});