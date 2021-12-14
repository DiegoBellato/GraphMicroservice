const dbConfig = require('../config/connection_db');
// Sequelize is the package
const Sequelize = require("sequelize"); 
// sequelize is the connection
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password,{
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        encrypt: dbConfig.dialectOptions.encrypt
    },
    define: {
        timestamps: dbConfig.define.timestamps
    }
});

// create empty database object
const db = {};

// create properties for database object
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// 'sequelize,Sequelize' are the exported objects from /Table_Statuses.js etc
db.Statuses = require('./Table_Statuses.js')(sequelize,Sequelize);
db.Elements = require('./Table_Elements.js')(sequelize,Sequelize);
db.Stratigraphies = require('./Table_Stratigraphies.js')(sequelize,Sequelize);

db.Elements.hasMany(db.Stratigraphies, {
    foreignKey: "ElementID"
  });
db.Stratigraphies.belongsTo(db.Elements, {
  foreignKey: "ElementID"
});

// export object db with its properties
module.exports = db;