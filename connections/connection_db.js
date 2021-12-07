const express = require('express');
const {Connection,Request} = require("tedious");
var assert = require('assert');
require('dotenv/config');

// Attempt to connect and execute queries if connection goes through
function setConnection () {
    const config = { 
        authentication: {
          options: {
            userName: process.env.DB_CONNECTION_us, 
            password: process.env.DB_CONNECTION_pw
          },
          type: "default"
        },
        server: "zge.database.windows.net", 
        options: {
          database: "ProjectsIG", 
          encrypt: true,
          port: 1433
        }
    };
    console.log('Trying to conncet to DB...');
    return new Promise((resolve, reject) => {
        const connection = new Connection(config);
        connection.connect();
        connection.on('connect', function(err) {
            if (err) {
                return reject(err);
            } else {
                resolve(connection);
                console.log('Connected to DB!');

                console.log("Reading rows from Projects...");
                // Read all rows from table
                const request = new Request(
                  `SELECT TOP 10 p.ProjectName as ProjectName
                   FROM [Projects] p`,
                  (err, rowCount) => {
                    if (err) {
                      console.log('There was an error!');
                      console.error(err.message);
                    } else {
                      console.log('Rows are coming...');
                      console.log(`${rowCount} row(s) returned`);
                    }
                  }
                );
              
                request.on("row", columns => {
                  columns.forEach(column => {
                    console.log("%s\t%s", column.metadata.colName, column.value);
                  });
                });
                //queryDatabase();
            }
        })
    })
};

// function queryDatabase() {
//     console.log("Reading rows from Projects...");
//     // Read all rows from table
//     const request = new Request(
//       `SELECT TOP 10 p.ProjectName as ProjectName
//        FROM [Projects] p`,
//       (err, rowCount) => {
//         if (err) {
//           console.error(err.message);
//         } else {
//           console.log(`${rowCount} row(s) returned`);
//         }
//       }
//     );
  
//     request.on("row", columns => {
//       columns.forEach(column => {
//         console.log("%s\t%s", column.metadata.colName, column.value);
//       });
//     });
// }

module.exports = {setConnection}