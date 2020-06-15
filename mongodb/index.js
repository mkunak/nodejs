const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

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

const dbUser = 'mkunak';
const dbName = 'nodejs-lessons';
const password = 'Ovc3iVyYEdtHGKq4';
const mongoUrl = `mongodb+srv://${dbUser}:${password}@cluster0-iixtt.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log(`>>> Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.log('>>> Start server: ', error);

  }
}

startServer();
