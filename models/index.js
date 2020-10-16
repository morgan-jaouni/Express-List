const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully...');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = {
  User: require('./User'),
  Product: require('./Product')
};