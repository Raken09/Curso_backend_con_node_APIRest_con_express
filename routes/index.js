const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoryRouter = require('./category.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); // Se crea un path o prefijo para las rutas
  router.use('/productos', productsRouter); // Se define el endpoint para el router de productos
  router.use('/usuarios', usersRouter); // Se define el endpoint para el router de usuarios
  router.use('/categorias', categoryRouter); // Se define el endpoint para el router de categorias
}

module.exports = routerApi;
