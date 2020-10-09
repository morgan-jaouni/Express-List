const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// View Engine
app.set('view engine', 'ejs');



// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});