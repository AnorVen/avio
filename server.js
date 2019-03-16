const express = require('express');
const cors = require('cors');
const axios = require('axios');
const apiKey = '';

app = express();
app.get('/', function(req, res) {
	res.send('Hello World!');
});
app.use(cors());

app.get('/api/test', (req, res) => {
	console.log(req.query);
	console.log(res.query);
	axios
		.get(`https://api.rasp.yandex.net/v3.0/schedule/?`, {
			params: req.query,
		})
		.then(response => {
			res.send(response.data);
		})
		.catch(error => {
			console.log(error);
		});
});

app.listen(3001, function() {
	console.log('Example app listening on port 3001!');
});
