const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Database
const db = require('./models');

// View Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(__dirname + '/public'));

// Controller
const ctrl = require('./controllers');


// Middleware

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

// Routes

// Home Route
app.get('/', (req, res) => {
  db.Product.find({}, (err, allProducts) => {
    if (err) return console.log(err);

    const context = { products: allProducts }
    res.render('index', context);
  });
});

// POST New user
app.post('/users', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return console.log(err);

    res.redirect('/users');
  })
});

//Products Index
app.use('/products', ctrl.products);

//Users Index
app.use('/users', ctrl.users);

app.use('*', (req, res) => {
  db.Product.find({}, (err, allProducts) => {
    if (err) return console.log(err);
    
    const context = { products: allProducts };
    res.render('404', context);
  });
});



// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});