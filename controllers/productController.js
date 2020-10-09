const express = require('express');
const router = express.Router();

const db = require('../models');

//Get Index
router.get('/', (req,res) => {
    res.render('products/index');
});


module.exports = router;