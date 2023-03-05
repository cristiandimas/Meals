const Reviews = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReviewsById = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;
  const { sessionUser } = req;

  const review = await Reviews.findOne({
    where: {
      id,
      restaurantId,
      status: 'active',
    },
  });
  if (!review) {
    return next(new AppError('order not found', 404));
  }
  if (review.userId !== sessionUser.id) {
    return next(new AppError('You do not own this review', 401));
  }
  req.review = review;
  next();
});
