const express = require('express');
const Car = require('../models/Car');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/car-add', {
    title: 'Cars < Add new car >',
    isCarAdd: true
  });
});

router.post('/', async (req, res) => {
  const { brand, model, image, description, email, price } = req.body;
  const car = new Car(brand, model, image, description, email, price);

  await car.save();

  res.redirect('/cars');
});

module.exports = router;