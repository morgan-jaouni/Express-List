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

// Controller
const ctrl = require('./controllers');


// Middleware

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes

// Home Route
app.get('/', (req, res) => {
  res.render('index');
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



// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});