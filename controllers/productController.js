const express = require('express');
const router = express.Router();

const db = require('../models');

//Get Index
router.get('/', (req,res) => {
    res.render('products/index');
});


//New Product 
router.get('/new', (req,res) => {
    db.User.find({}, (err, allUsers) => {

        if (err) return console.log(err);
        const context = {
            users: allUsers
        }
        res.render('products/new', context);
    });
});

//POST new product

router.post('/', (req,res) => {
    db.Product.create(req.body, (err, newProduct) => {

        if (err) return console.log(err);

    db.User.findById(req.body.user, (err, foundUser) =>{
        if (err) return console.log(err);
        res.redirect(`/products/${newProduct.id}`);
    }); 
  });
});

module.exports = router;