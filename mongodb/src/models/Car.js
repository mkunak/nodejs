const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Car {
  constructor(brand, model, image, description, email, price) {
    this.brand = brand;
    this.model = model;
    this.image = image;
    this.email = email;
    this.proce = price;
    this.description = description;
    this._id = uuid.v4();
  }

  async save() {
    const cars = await Car.getCars();
    cars.push(this.getCar());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../../db', 'cars.json'),
        JSON.stringify(cars),
        (err) => {
          if (err) reject(err);
          console.log('>>> The file <cars.json> was saved!');
          resolve();
        });
    });
  }

  getCar() {
    return {
      brand: this.brand,
      model: this.model,
      image: this.image,
      email: this.email,
      price: this.proce,
      description: this.description,
      _id: this._id,
    };
  }

  static async update(data) {
    const cars = await Car.getCars();
    const i = cars.findIndex((car) => car._id === data._id);
    cars[i] = data;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../../db', 'cars.json'),
        JSON.stringify(cars),
        (err) => {
          if (err) reject(err);
          console.log('>>> The file <cars.json> was updated!');
          resolve();
        });
    });
  }

  static async getCarById(id) {
    const cars = await Car.getCars();
    return cars.find((car) => car._id === id);
  }

  static getCars() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../../db', 'cars.json'),
        'utf-8',
        (err, content) => {
          if (err) reject(err);
          resolve(JSON.parse(content));
        }
      );
    });
  }
}

module.exports = Car;
