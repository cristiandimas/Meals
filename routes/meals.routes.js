const { Router } = require('express');
const { check } = require('express-validator');
const {
  createMeals,
  getAllMeals,
  getMealById,
  updateMealById,
  deleteMealById,
} = require('../controllers/meals.controller');
const { protect, restrictTo } = require('../middlewares/auth.middlewares');
const { validMealsById } = require('../middlewares/meals.middlewaes');
const {
  validRestaurantsById,
} = require('../middlewares/restaurants.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

router.get('/', getAllMeals);
router.get('/:id', validMealsById, getMealById);

router.use(protect);
router.post(
  '/:id',
  [
    check('name', 'The name is require').not().isEmpty(),
    check('price', 'The price in require').not().isEmpty(),
    check('price', 'The price in require').isNumeric(),
    validRestaurantsById,
    validationFields,
    restrictTo('admin'),
  ],
  createMeals
);
router.patch('/:id', validMealsById, restrictTo('admin'), updateMealById);
router.delete('/:id', validMealsById, restrictTo('admin'), deleteMealById);

module.exports = {
  mealsRouter: router,
};
