const express = require('express');
const Car = require('../models/Car');

const router = express.Router();

router.get('/', async (req, res) => {
  const cars = await Car.getCars();
  res.render('pages/cars', {
    title: 'Cars < All cars >',
    isCars: true, cars
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) return res.redirect('/');
  const car = await Car.getCarById(req.params.id);
  res.render('pages/car-edit', {
    title: `Edit ${car.brand} ${car.model}`,
    car
  });
});

router.get('/:_id', async (req, res) => {
  const car = await Car.getCarById(req.params._id);
  res.render('pages/car', {
    layout: 'empty',
    title: `Car < ${car.brand} ${car.model} >`,
    isCar: true,
    car
  });
});

router.post('/edit', async (req, res) => {
  await Car.update(req.body);
  res.redirect('/cars');
});

module.exports = router;
