const express = require('express');
const router = express.Router();

const db = require('../models');

//Get Index
router.get('/', (req,res) => {
    res.render('products/index');
});


//New Product
router.get('/new', (req,res) => {

    res.render('products/new')

});


module.exports = router;