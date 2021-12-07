const express = require('express');
const app = express();
const { Connection, Request } = require("tedious");
require('dotenv/config')

// midllewares - function run when we hit a specific route
app.use('/posts', () => {
    console.log('This is a middleware running')
});

// ROUTES
app.get('/',(req, res) => {
    res.send('we are on home')
});

app.get('/posts',(req, res) => {
    res.send('we are on posts')
});

// connect to DB
const config ={
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

  const connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
      queryDatabase();
    }
  });
  
  connection.connect();


  function queryDatabase() {
    console.log("Reading rows from Projects");
  
    // Read all rows from table
    const request = new Request(
      `SELECT TOP 10 p.ProjectName as ProjectName
       FROM [Projects] p`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
  
    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });
  
    connection.execSql(request);
  }