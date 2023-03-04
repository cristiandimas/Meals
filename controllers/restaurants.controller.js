const Restaurants = require('../models/restaurants.models');
const catchAsync = require('../utils/catchAsync');

exports.createdRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurants.create({
    name,
    address,
    rating,
  });
  res.status(200).json({
    status: 'success',
    message: 'The new Restaurant was been created',
    newRestaurant,
  });
});
exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      status: 'active',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'Restaurants found successfully',
    restaurants,
  });
});

exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  return res.status(200).json({
    status: 'success',
    message: 'Restaurant found successfully',
    restaurant,
  });
});
exports.updateRestaurantById = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;
  const updateRestaurant = await restaurant.update({ name, address });
  res.status(200).json({
    status: 'success',
    message: 'The Restaurant was been update',
    updateRestaurant,
  });
});

exports.deteleRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurant.update({ status: 'inactive' });
  res.status(200).json({
    status: 'success',
    message: `The Restaurant with id ${restaurant.id} was deleted`,
  });
});
