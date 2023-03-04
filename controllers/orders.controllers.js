const Meals = require('../models/meals.models');
const Orders = require('../models/orders.models');
const Restaurants = require('../models/restaurants.models');
const catchAsync = require('../utils/catchAsync');

exports.findAllOrdersByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Orders.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: {
      model: Restaurants,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    },
    include: {
      model: Meals,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Orders placed by the user',

    orders,
  });
});

exports.findOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { order } = req;

  const orders = await Orders.findOne({
    where: {
      userId: sessionUser.id,
      id: order.id,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Orders placed by the user',
    orders,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;
  const meal = await Meals.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  const newOrder = await Orders.create({
    quantity,
    mealId,
    totalPrice: meal.price * quantity,
    userId: sessionUser.id,
  });
  res.status(200).json({
    status: 'success',
    message: 'The new Order was been created',
    newOrder,
  });
});

exports.getOrderByUser = catchAsync(async (req, res, next) => {});
