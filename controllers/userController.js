const express = require('express');
const router = express.Router();

const db = require('../models');


//View users route
router.get('/', (req,res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return console.log(err);

    const context = { users: allUsers };

    res.render('users/index', context);
  });
});

// GET New
router.get('/new', (req, res) => {
  res.render('users/new');
});


// POST New user
router.post('/', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return console.log(err);

    res.redirect('/users');
  })
});

// GET Users show page
router.get('/:userId', (req, res) => {
  db.User.findById(req.params.userId)
    .populate('products')
    .exec((err, foundUser) => {
      if(err) return console.log(err);

      console.log('foundUser: ', foundUser);

      const context = { user: foundUser };
      
      res.render('users/show', context);
    });
});

//User Delete 
router.delete('/:userId', (req,res) => {

    //query db
    db.User.findByIdAndDelete(req.params.userId, (err, deleteUser) => {
      if (err) return console.log(err);

    db.Product.deleteMany({_id: {$in: deleteUser.products}}, (err) => {
      if (err) return console.log(err);
      
      //redirect to users index
      res.redirect('/users');

    }); 
  });
});


//User Update


module.exports = router;