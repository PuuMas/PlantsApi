'use strict'

 var mysql = require('mysql2');

var connection = mysql.createConnection( {
	host : 'localhost',
	user : 'root',
	password : 'Ruutti',
	port : 3306,
	database : 'plants',
	insecureAuth : true
});

module.exports =
{
	fetchAll: function(req, res) {
		var sql = "SELECT * FROM herbs"
		connection.query(sql, function(error, results, fields) {
			if (error) {
				console.log("Virhe haettaessa dataa, syy: " + error);
				res.send({"status": 500, "error": error, "response": null});
			} else {
				console.log("Data = " + JSON.stringify(results));
				res.statusCode = 200;
				res.send(results);
			}
		});
	},
	fetchName: function(req, res) {
		var message = "No results found";
		var sql = "SELECT * FROM herbs where herb_name LIKE '%" + req.params.name +"%'";
		connection.query(sql, function(error, results, fields) {
			if (error) {
				console.log("Virhe haettaessa dataa, syy: " + error);
				res.send({"status": 500, "error": error, "response": null});
			}else{
				if(results.length == 0){
					res.send(results);
				}else{
					console.log(req.url)
					//console.log("Data = " + JSON.stringify(results));
					res.statusCode = 200;
					res.send(results);
				}
			}
		});
	}
}
