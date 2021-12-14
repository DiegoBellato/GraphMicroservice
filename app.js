const bodyParser = require('body-parser');
const express = require('express');
const db = require('./models');
const app = express();
//const cors = require("cors");
const controller = require("./controllers/controller_elements");

// var corsOptions = {
//   origin: "http://localhost:3001"
// };
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-fore-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// placed to run some functions
const run = async () => {
  const ElementData = await controller.LayersFromElementID(27384);
  console.log(
    ">>Layers:",
    JSON.stringify(ElementData, null, 2)
  );
};

// Test DB
db.sequelize.sync().then(() => {
  console.log("Executing request")
  run();
});


// ROUTES
app.get('/',(req, res) => {
  res.json({message: 'we are on home!!!'})
});

// Statuses Routes (middleware)
// 'app' is the exported object from /routes/statuses 
require('./routes/statuses')(app)
require('./routes/elements')(app)

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


