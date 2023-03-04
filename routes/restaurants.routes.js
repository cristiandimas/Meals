const { Router } = require('express');
const { check } = require('express-validator');
const {
  createdRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deteleRestaurantById,
} = require('../controllers/restaurants.controller');
const {
  createdReview,
  updateReviewsById,
  deleteReviewById,
} = require('../controllers/review.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middlewares');
const {
  validRestaurantsById,
} = require('../middlewares/restaurants.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.use(protect);
router.post(
  '/',
  [
    check('name', 'The name is require').not().isEmpty(),
    check('address', 'The address is require').not().isEmpty(),
    check('rating', 'The Rating ir require').not().isEmpty(),
    validationFields,
  ],
  restrictTo('admin'),
  createdRestaurant
);
router.patch('/:id', restrictTo('admin'), updateRestaurantById);
router.delete('/:id', restrictTo('admin'), deteleRestaurantById);
router.post('/reviews/:id', validRestaurantsById, createdReview);
router.patch('/reviews/:restaurantId/:id', updateReviewsById);
router.delete('/reviews/:restaurantId/:id', deleteReviewById);

module.exports = {
  restaurantsRouter: router,
};
