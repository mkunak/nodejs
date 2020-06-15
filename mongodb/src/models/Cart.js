const path = require('path');
const fs = require('fs');

const pathToCart = path.join(
  path.dirname(process.mainModule.filename),
  'db',
  'cart.json'
);

class Cart {
  static async add(car) {
    const cart = await Cart.fetch();

    const i = cart.cars.findIndex((c) => c._id === car._id);

    if (i >= 0) {
      cart.cars[i].count++;
    } else {
      car.count = 1;
      cart.cars.push(car);
    }

    cart.price += Number(car.price);

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToCart, JSON.stringify(cart), (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToCart, 'utf-8', (err, content) => {
        if (err) reject(err);
        resolve(JSON.parse(content));
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();

    const i = cart.cars.findIndex((c) => c._id === id);
    const carToDelete = cart.cars[i];

    if (carToDelete.count === 1) {
      cart.cars = cart.cars.filter((c) => c._id !== id);
    } else {
      cart.cars[i].count--;
    }

    cart.price -= Number(carToDelete.price);

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToCart, JSON.stringify(cart), (err) => {
        if (err) reject(err);
        resolve(cart);
      });
    });
  }
}

module.exports = Cart;