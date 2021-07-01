'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection( {
	//Here should be mysql connection data
});

module.exports =
{
	fetchAll: function(req, res) {
		var sql = "SELECT * FROM herbs"
		connection.query(sql, function(error, results, fields) {
			if (error) {
				console.log("Virhe haettaessa dataa kuvat-taulusta, syy: " + error);
				res.send({"status": 500, "error": error, "response": null});
			} else {
				console.log("Data = " + JSON.stringify(results));
				res.statusCode = 200;
				res.send(results);
			}
		});
	},
	fetchName: function(req, res) {
		var sql = "SELECT * FROM herbs where herb_name LIKE '%" + req.params.name +"%'";
		connection.query(sql, function(error, results, fields) {
			if (error) {
				console.log("Virhe haettaessa dataa kuvat-taulusta, syy: " + error);
				res.send({"status": 500, "error": error, "response": null});
			} else {
				console.log("Data = " + JSON.stringify(results));
				res.statusCode = 200;
				res.send(results);
			}
		});
	}
}
