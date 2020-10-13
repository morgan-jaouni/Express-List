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

// GET User  Edit

router.get('/:userId/edit', (req, res) =>{
  db.User.findById(req.params.userId, (err, foundUser) => {
      if (err) return console.log(err);

      const context = { user: foundUser };

      res.render('users/edit', context);
  });
});

// PUT edit
router.put('/:userId', (req, res) => {
  db.User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true },
      (err, updatedUser) => {
          if (err) return console.log(err);
          res.redirect(`/users/${updatedUser.id}`);
      }
  );
});



module.exports = router;