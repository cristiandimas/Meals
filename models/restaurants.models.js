const { DataTypes } = require('sequelize');
const { db } = require('../database/db');
const Meals = require('./meals.models');
const Reviews = require('./reviews.model');

const Restaurants = db.define('restaurants', {
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
});
Restaurants.hasMany(Reviews, {
  foreignKey: 'restaurantId',
  sourceKey: 'id',
});
Reviews.belongsTo(Restaurants, {
  foreignKey: 'restaurantId',
  targetKey: 'id',
});

Restaurants.hasMany(Meals, {
  foreignKey: 'restaurantId',
  sourceKey: 'id',
});
Meals.belongsTo(Restaurants, {
  foreignKey: 'restaurantId',
  targetKey: 'id',
});

module.exports = Restaurants;
