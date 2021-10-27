const express = require('express');

const productsService = require('./../services/product_service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new productsService();

// No se le coloca el endpoint '/productos', solo lo que iria despues
// Se le colocaria un endpoint en el index

router.get('/', async (req, res) => {
  const productos = await service.find();
  res.json(productos);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filtro');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params; // destructuring
      const producto = await service.findOne(id);
      res.json(producto);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'body'),
  validatorHandler(updateProductSchema, 'params'),
  async (req, res, next) => { // PATCH = UPDATE pero recibe los objetos de forma parcial
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Delete

router.delete('/:id', async (req, res) => { // PATCH = UPDATE pero recibe los objetos de forma parcial
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
