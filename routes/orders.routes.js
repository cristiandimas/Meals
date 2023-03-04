const { Router } = require('express');
const { createOrder } = require('../controllers/orders.controllers');
const { protect } = require('../middlewares/auth.middlewares');

const router = Router();

router.use(protect);

router.post('/', createOrder);
// router.get('/me', getOrderByUser);
// router.patch('/:id', updateOrderById);
// router.delete('/:id', deleteOrderById);

module.exports = {
  ordersRouter: router,
};
