const Orders = require('../models/orders.models');
const catchAsync = require('../utils/catchAsync');

exports.findAllOrdersByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { name, email } = sessionUser;
  const orders = await Orders.findAll({
    where: {
      userId: sessionUser.id,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Orders placed by the user',
    name,
    orders,
    
  });
});

exports.findOrderByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { name, email } = sessionUser;
  const orders = await Orders.findAll({
    where: {
      userId: sessionUser.id,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Orders placed by the user',
    name,
    orders,
    
  });
});


