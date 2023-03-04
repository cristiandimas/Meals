const Orders = require('../models/orders.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validOrdersById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  if (!order) {
    return next(new AppError('order not found', 404));
  }
  req.order = order;
  next();
});


