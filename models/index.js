const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('employeedb', 'root', '', {
    host: 'localhost',
    dialect:  'mysql'
  });

  try {
 sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./user")(sequelize ,DataTypes,Model)
 db.contact = require("./contact")(sequelize ,DataTypes)
//  db.user.hasOne(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
//  db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'})

// db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
//  db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'})


db.user.belongsToMany(db.contact, { through: 'user_contacts' });
 db.contact.belongsToMany(db.user, { through: 'user_contacts' });
 
 
 db.sequelize.sync({force : false})
  module.exports = db;