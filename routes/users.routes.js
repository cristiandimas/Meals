const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllOrdersByUser,
  findOrderById,
} = require('../controllers/orders.controllers');
const {
  findAllUsers,
  updateUsers,
  findUser,
  deleteUser,
  updatePassword,
} = require('../controllers/users.controller');
const {
  protecUpdateAccount,
  protect,
} = require('../middlewares/auth.middlewares');
const { validOrdersById } = require('../middlewares/orders.middlewares');
const { validUserById } = require('../middlewares/users.middlewares');
const {
  validationFields,
} = require('../middlewares/validationFields.middlewares');

const router = Router();

router.use(protect);

/* Una ruta que encontrará a todos los usuarios. */
router.get('/', findAllUsers);
/* Una ruta que va a encontrar un usuario por id. */
router.get('/orders', findAllOrdersByUser);
router.get('/:id', validUserById, findUser);

router.get('/orders/:id',  validOrdersById, findOrderById);
/* Una solicitud de patch para actualizar el usuario. */
router.patch(
  '/:id',
  [
    check('name', 'The name is require').not().isEmpty(),
    check('email', 'The email is require').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validationFields,
    validUserById,
    protecUpdateAccount,
  ],
  updateUsers
);

/* Una solicitud de patch para actualizar la contraseña del usuario. */
router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory ').not().isEmpty(),
    validationFields,
    validUserById,
    protecUpdateAccount,
  ],
  updatePassword
);

router.delete('/:id', validUserById, protecUpdateAccount, deleteUser);

module.exports = {
  usersRouter: router,
};
