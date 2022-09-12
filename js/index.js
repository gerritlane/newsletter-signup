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

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/index.html', (req, res) => {
	console.log(req.body);
	const firstName = xss(req.body.firstName);
	const lastName = xss(req.body.lastName);
	const email = xss(req.body.email);
	const addSubscriber = async() =>	{
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
		console.log(response);
	};
	addSubscriber();

	res.send('Success!');
});

app.listen(3000, function(){
	console.log('Server started on port 3000');
});