const express = require('express');
const Car = require('../models/Car');
const Cart = require('../models/Cart');

const router = express.Router();

router.post('/add', async (req, res) => {
  const car = await Car.getCarById(req.body._id);
  await Cart.add(car);
  res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  res.status(200).json(cart);
});

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();
  res.render('pages/cart', {
    title: 'Cars Cart',
    isCart: true,
    cars: cart.cars,
    price: cart.price,
  });
});

module.exports = router;