const express = require('express');
const router = express.Router();

const db = require('../models');


//View users route
router.get('/', (req,res) => {

    res.render('users/index')

});


module.exports = router;