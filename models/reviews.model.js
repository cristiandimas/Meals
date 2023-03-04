const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Reviews = db.define('reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // restaurantId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Reviews;
