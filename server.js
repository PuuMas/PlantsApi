var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var todoListController = require('./api/controllers/toDoListController');

const http = require('http');
const url = require('url');

const hostname = '192.168.1.3';
const port = process.env.PORT || 80;

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
}

//app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.route('/plants')
	.get(todoListController.fetchAll);

app.route('/search')
	.post(todoListController.fetchName);

app.listen(port, hostname, () => {
	console.log(`Server running AT http://${hostname}:${port}/`);
});