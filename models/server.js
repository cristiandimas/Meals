const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const morgan = require('morgan');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const { authRouter } = require('../routes/auth.routes');
const { usersRouter } = require('../routes/users.routes');
const { restaurantsRouter } = require('../routes/restaurants.routes');
const { mealsRouter } = require('../routes/meals.routes');
const { ordersRouter } = require('../routes/orders.routes');
const helmet = require('helmet');
const xss = require('xss-clean');

/* The Server class is a class that creates an express server, and it has a constructor that sets up
the server, and it has a listen method that starts the server listening on the port. */
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    //Definimos las paths de nuestra aplicación
    this.paths = {
      users: '/api/v1/users',
      restaurants: '/api/v1/restaurants',
      meals: '/api/v1/meals',
      orders: '/api/v1/orders',
      auth: '/api/v1/auth',
    };
    //Llamada al metodo de conexión a la base de  datos
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(xss());
  }
  // Aquí tenemos nuestras rutas
  routes() {
    //indicamos el uso de las rutas
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.restaurants, restaurantsRouter);
    this.app.use(this.paths.meals, mealsRouter);
    this.app.use(this.paths.orders, ordersRouter);
    //indicamos el uso de la ruta de  autenticacion
    this.app.use(this.paths.auth, authRouter);

    /* A catch all route. It will catch all requests that do not match any other route. */
    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }
  //creamos metodo para la conexión a la base de datos
  database() {
    //nos autenticamos ante la base de datos, utilizando el objeto db del archivo db.js de la carpeta database
    db.authenticate()
      //authenticate nos devuelte una promesa, hacemos manejo de promesa con then y catch
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));
    //sincronizamos la bases de datos
    db.sync()
      //sync nos devuelve una promesa,  hacemos uso de then y catch para manejrar la promesa
      .then(() => console.log('Database Sync'))
      .catch(err => console.log('err'));
  }
  //Le indicamos a nuestro server que escuche el puerto
  listen() {
    this.app.listen(this.port, () => {
      //enviamos mensaje por consola para indicar el puerto que estamos escuchando
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
