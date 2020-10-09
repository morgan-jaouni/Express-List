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





module.exports = router;