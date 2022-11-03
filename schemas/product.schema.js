const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(80);
const description = Joi.any().optional();
const price = Joi.number().precision(2).positive().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.optional(),
  price: price.required(),
  image: image.optional(),
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
