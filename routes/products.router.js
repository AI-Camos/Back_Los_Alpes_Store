const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema } = require('./../schemas/product.schema');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const service = new ProductsService();
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  // validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const service = new ProductsService();
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const service = new ProductsService();
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  // validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const service = new ProductsService();
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
