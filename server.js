const express = require('express');
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
	res.send({
		status: 'OK',
		timestamp: new Date().toISOString(),
	});
});

app.use('*', (req, res) => {
	res.send(
		'<img width="50%" align="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo39HTqrjJ4NY_NWYz3nF-6AfzCEjG8QAbbHEqEnECRAgpzsl4sIb8Fne8i7QZQQOWj3I&usqp=CAU">'
	);
});

app.listen(port, () => {
	console.log(
		`Demo app is up and listening to port: ${port}, PID: ${process.pid}`
	);
});
