const Meals = require('../models/meals.models');
const Restaurants = require('../models/restaurants.models');
const catchAsync = require('../utils/catchAsync');

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;
  const newMeal = await Meals.create({
    name,
    price,
    restaurantId: restaurant.id,
  });
  res.status(200).json({
    status: 'success',
    message: 'The New  Meal was been created',
    newMeal,
  });
});

exports.getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      status: 'active',
    },
    include: {
      model: Restaurants,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
      where: {
        status: 'active',
      },
    },
  });
  res.status(200).json({
    status: 'success',
    message: ' Meals found successfully',
    meals,
  });
});
exports.getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;
  return res.status(200).json({
    status: 'success',
    message: 'Meals found successfully',
    meal,
  });
});

exports.updateMealById = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;
  const updateMeal = await meal.update({ name, price });
  res.status(200).json({
    status: 'success',
    message: 'The Meal was been update',
    updateMeal,
  });
});

exports.deleteMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: inactive });
  res.status(200).json({
    status: 'success',
    message: `The Meal with id ${meal.id} was deleted`,
  });
});
