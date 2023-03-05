const Reviews = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.createdReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const newReview = await Reviews.create({
    comment,
    rating,
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });
  res.status(200).json({
    status: 'success',
    message: 'The New Review was been created',
    newReview,
  });
});

exports.updateReviewsById = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  const updateReview = await review.update({
    comment,
    rating,
  });
  res.status(200).json({
    status: 'success',
    message: 'The Review was been updated',
    updateReview,
  });
});

exports.deleteReviewById = catchAsync(async (req, res, next) => {  
  const { review } = req;

  const deleteReview = await review.update({
    status: 'deleted'
  });
  res.status(200).json({
    status: 'success',
    message: `The Review  with id ${deleteReview.id} was deleted`,    
  });
});

