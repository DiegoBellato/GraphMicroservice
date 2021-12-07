const express = require('express');
const app = express();
const azureSql = require('./connections/connection_db');

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

// Listener
app.listen(3000, function (req, res) {
  console.log('Server is running...');
  azureSql.setConnection();
});


