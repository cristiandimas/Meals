const { DataTypes } = require('sequelize');
const { db } = require('../database/db');
const Orders = require('./orders.models');

const Meals = db.define('meals', {
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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
});

Meals.hasMany(Orders, {
  foreignKey: 'mealId',
  sourceKey: 'id',
});
Orders.belongsTo(Meals, {
  foreignKey: 'mealId',
  targetKey: 'id',
});

module.exports = Meals;
