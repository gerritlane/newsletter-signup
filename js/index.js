const express = require('express');
const path = require('path');
const https = require('https');
const xss = require('xss');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();

// Configure environment
require('dotenv').config();
const api_key = process.env.MAILCHIMP_API_KEY;
const mc_server = process.env.MAILCHIMP_SERVER;
const audience_id = process.env.MAILCHIMP_AUDIENCE_ID;
mailchimp.setConfig({
  apiKey: api_key,
  server: mc_server,
});

// app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/index.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/index.html', (req, res) => {
	console.log(req.body);
	const firstName = xss(req.body.firstName);
	const lastName = xss(req.body.lastName);
	const email = xss(req.body.email);

	const addSubscriber = async() =>	{
		try {
			const response = await mailchimp.lists.batchListMembers(audience_id, {
				members: [{
					email_address: email,
					status: "subscribed",
					merge_fields: {
						FNAME: firstName,
						LNAME: lastName
					}
				}],
			});
			if (response.error_count > 0) {
				throw response.errors[0].error;
			}
			res.sendFile(path.join(__dirname, '../success.html'));
			console.log(response);
		} catch(error) {
			res.sendFile(path.join(__dirname, '../failure.html'));
			console.log(error);
		};
	};
	addSubscriber();

});

app.listen(3000, function(){
	console.log('Server started on port 3000');
});