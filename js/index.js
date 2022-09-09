const express = require('express');
const path = require('path');
const https = require('https');
const xss = require('xss');
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});

// app.get('/css/styles.css', (req, res) => {
//   res.sendFile(path.join(__dirname, '../css/styles.css'));
// });

// app.get('/images/logo.svg', (req, res) => {
//   res.sendFile(path.join(__dirname, '../images/logo.svg'));
// });


app.listen(3000, function(){
	console.log('Server started on port 3000');
});