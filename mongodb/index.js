const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const homeRoutes = require('./src/routes/home');
const cartRoutes = require('./src/routes/cart');
const carsRoutes = require('./src/routes/cars');
const aboutRoutes = require('./src/routes/about');
const carAddRoutes = require('./src/routes/car-add');

const app = express();

// connecting handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// setting folder wuth static content (css, images, js)
app.use(express.static(path.join(__dirname, 'public')));

// urlencoded
app.use(express.urlencoded({ extended: true }));

// routing
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/cars', carsRoutes);
app.use('/car-add', carAddRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`>>> Server is running on port ${PORT}...`);
});
