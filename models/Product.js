const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  condition: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;