const express = require('express');
const router = express.Router();

const db = require('../models');

//Get Index
router.get('/', (req,res) => {
    
    db.Product.find({}, (err, allProducts) => {
    
        if (err) return console.log(err);

        res.render('products/index', {products : allProducts})

    });
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
        foundUser.products.push(newProduct._id);
        foundUser.save((err, savedUser) => {
            if (err) return console.log(err);

            res.redirect(`/products/${newProduct.id}`);
        });
    }); 
  });
});

//GET Show products
router.get('/:productId', (req,res) =>{

    db.Product.findById(req.params.productId)
    .populate('user')
    .exec((err, productById) => {
        if(err) return console.log(err);
        console.log(productById);
        const context = { product: productById };

        res.render('products/show', context);

    });
});


module.exports = router;