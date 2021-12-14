require('dotenv/config');

// Attempt to connect and execute queries if connection goes through   
module.exports = {
  database: 'ProjectsIG',
  user: process.env.DB_CONNECTION_us,
  password: process.env.DB_CONNECTION_pw,
  host: "zge.database.windows.net",
  dialect: "mssql",
  port: 1433,
  pool: {
    max: 100,
    min:0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  },
  define: {
    timestamps: false
  }
};