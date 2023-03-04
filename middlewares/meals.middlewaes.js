const Meals = require('../models/meals.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validMealsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meals.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }
  req.meal = meal;
  next();
});
