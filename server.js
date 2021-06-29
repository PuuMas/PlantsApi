var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var todoListController = require('./api/controllers/toDoListController');

const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = process.env.PORT || 3000;

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

app.route('/plants/:name')
	.get(todoListController.fetchName);

app.listen(port, hostname, () => {
	console.log(`Server running AT http://${hostname}:${port}/`);
});