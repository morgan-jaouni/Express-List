const express = require('express');
const router = express.Router();
const api = process.env.API_KEY;

const db = require('../models');

//Get Index
router.get('/', (req,res) => {
    db.Product.find({}, (err, allProducts) => {
        if (err) return console.log(err);

        res.render('products/index', {products : allProducts})
    });
});

//GET New Product 
router.get('/new', (req,res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) return console.log(err);
        db.Product.find({}, (err, allProducts) => {

            const context = {
                users: allUsers,
                products: allProducts,
            }
            res.render('products/new', context);
        });
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

        db.Product.find({}, (err, allProducts) => {
            if (err) return console.log(err);
            console.log(productById);
            const context = {
                product: productById,
                api: api,
                products: allProducts,
            };

            console.log(allProducts);
    
            res.render('products/show', context);
        });
    });
});

// GET Edit
router.get('/:productId/edit', (req, res) =>{
    db.Product.findById(req.params.productId, (err, foundProduct) => {
        if (err) return console.log(err);
        db.Product.find({}, (err, allProducts) => {
            if (err) return console.log(err);

            const context = {
                product: foundProduct, 
                products: allProducts,
            };
    
            res.render('products/edit', context);
        });
    });
});

// PUT edit
router.put('/:productId', (req, res) => {
    db.Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true },
        (err, updatedProduct) => {
            if (err) return console.log(err);
            res.redirect(`/products/${updatedProduct.id}`);
        }
    );
});

// Delete
router.delete('/:productId', (req, res) =>{
    const productId = req.params.productId;
    
    db.Product.findByIdAndDelete(productId, (err) => {
        if (err) return console.log(err);

        db.User.findOne({'products' : productId}, (err, foundUser) => {
            if (err) return console.log(err);

            foundUser.products.remove(productId);
            foundUser.save((err, updatedUser) => {
                if (err) return console.log(err);

            })
        })
        res.redirect('/products');
    });
});

module.exports = router;