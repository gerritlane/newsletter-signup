const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.listen(3000, function(){
	console.log('Server started on port 3000');
});