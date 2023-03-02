const { DataTypes } = require('sequelize');
const { db } = require('../database/db');
const Orders = require('./orders.models');
const Reviews = require('./reviews.model');


const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.ENUM('normal', 'admin'),
    allowNull: false,
    defaultValue: 'normal',
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Users.hasMany(Reviews, {
  foreignKey: 'userId',
  sourceKey: 'id',
});
Reviews.belongsTo(Users, {
  foreignKey: 'userId',
  targetKey: 'id',
});
Users.hasMany(Orders, {
  foreignKey: 'userId',
  sourceKey: 'id',
});
Orders.belongsTo(Users, {
  foreignKey: 'userId',
  targetKey: 'id',
});

module.exports = Users;
