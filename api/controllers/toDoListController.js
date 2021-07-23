"use strict";

var mysql = require("mysql");

//Spawn for running scripts
const {spawn} = require('child_process');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "plants",
  insecureAuth: true,
});

module.exports = {
	//Fetch all the herbs
  fetchAll: function (req, res) {
    var sql = "SELECT * FROM herbs";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Virhe haettaessa dataa, syy: " + error);
        res.send({ status: 500, error: error, response: null });
      } else {
        console.log("Data = " + JSON.stringify(results));
        res.statusCode = 200;
        res.send(results);
      }
    });
  },
  //Fetch the name of the herb that user writes
  fetchName: function (req, res) {
    var message = "No results found";
    var sql =
      "SELECT * FROM herbs where herb_name LIKE '%" + req.params.name + "%'";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Virhe haettaessa dataa, syy: " + error);
        res.send({ status: 500, error: error, response: null });
      } else {
        if (results.length == 0) {
          res.send(results);
        } else {
          console.log(req.url);
          //console.log("Data = " + JSON.stringify(results));
          res.statusCode = 200;
          res.send(results);
        }
      }
    });
  },
  //Run script to get data from the IOT-Device
  runScript: function (req, res) {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn("python", ["kasvi.py"]);
    // collect data from script
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      res.send(dataToSend);
    });
  },
};
