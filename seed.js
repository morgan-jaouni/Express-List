require('dotenv').config();
const db = require('./models');

const products = [
  {
    type: "'66 Ford Mustang",
    price: 12000,
    condition: 'Mint',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/1966_Ford_Mustang_Coupe.jpg',
  },
  {
    type: "'69 Plymouth Barracuda",
    price: 21000,
    condition: 'Mint',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/1969_Plymouth_Barracuda_fastback_coupe_%2815649278395%29.jpg',
  },
  {
    type: "'67 Pontiac GTO",
    price: 23999,
    condition: 'Mint',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Pontiac_GTO_1967_%289056610105%29.jpg',
  },
  {
    type: "Old Bus",
    price: 999,
    condition: 'Used',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Old_Bus_%283658175083%29.jpg',
  },
  {
    type: "Apple II Plus",
    price: 1995,
    condition: 'Used',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Apple_II_plus.jpg',
  },
];

db.Product.deleteMany((err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log(result);

  db.Product.create(products, (err, newProducts) => {
    if (err) {
      console.log(err);
    }
    console.log(newProducts);
    process.exit();
  });
});