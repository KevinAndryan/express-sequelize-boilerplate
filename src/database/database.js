const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const dialectOptions = process.env.NODE_ENV === 'production' ? {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}: null;

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions: dialectOptions
  }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Models/tables
 */
db.User = require("../models/User.model.js")(sequelize, Sequelize);
db.Invoice = require('../models/Invoice.model.js')(sequelize, Sequelize);


/**
 * Relationships
 */
db.User.hasMany(db.Invoice, { as: "invoices" });
db.Invoice.belongsTo(db.User, {as: "user",});


module.exports = db;