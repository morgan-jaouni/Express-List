require('dotenv').config();
const db = require('./models');

// Seed user data
const users = [
  {
    name: 'Ashley, Smith',
    userName: 'ashley01',
    password: 'coldhands',
    location: 'Anchorage',
  },
  {
    name: 'Jake Claw',
    userName: 'j-claw',
    password: 'redblanket',
    location: 'Milwaukee',
  },
  {
    name: 'Kathy Burgs',
    userName: 'katburg',
    password: 'bumpyroad',
    location: 'Toronto',
  },
  {
    name: 'Bruce Leroy',
    userName: 'the-bruce',
    password: 'lastdragon',
    location: 'New York City',
  },
  {
    name: 'Captain Romano',
    userName: 'il-capitano',
    password: 'parmesan',
    location: 'Rome, Italy',
  },
];

// Seed products data
const products = [
  {
    type: "'66 Ford Mustang",
    price: 12000,
    condition: 'Mint',
    seller: {name: 'Jake Claw'},
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/1966_Ford_Mustang_Coupe.jpg',
  },
  {
    type: "'69 Plymouth Barracuda",
    price: 21000,
    condition: 'Mint',
    seller: {name: 'Jake Claw'},
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/1969_Plymouth_Barracuda_fastback_coupe_%2815649278395%29.jpg',
  },
  {
    type: "'67 Pontiac GTO",
    price: 23999,
    condition: 'Mint',
    seller: {name: 'Jake Claw'},
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Pontiac_GTO_1967_%289056610105%29.jpg',
  },
  {
    type: "Old Bus",
    price: 999,
    condition: 'Used',
    seller: {name: 'Jake Claw'},
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Old_Bus_%283658175083%29.jpg',
  },
  {
    type: "Apple II Plus",
    price: 1995,
    condition: 'Used',
    seller: {name: 'Kathy Burgs'},
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Apple_II_plus.jpg',
  },
];

// Create collections
db.Product.deleteMany((err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log(result);
  db.User.deleteMany((err, result) => {
    if (err) {
      console.log(err);
      process.exit();
    }
  
    console.log(result);

    db.User.create(users, (err, newUsers) => {
      if (err) {
        console.log(err);
      }
      console.log(newUsers);

      for (let i = 0; i < products.length; i++) {
        db.Product.create(products[i], (err, newProduct) => {
          if (err) {
            console.log(err);
            process.exit();
          }

          db.User.findOne(products[i].seller, (err, foundUser) => {
            if (err) {
              console.log(err);
              process.exit()
            }
            foundUser.products.push(newProduct._id);
            foundUser.save((err, savedUser) => {
              if (err) {
                console.log(err);
                process.exit()
              }
              
              newProduct.user = foundUser._id;
              newProduct.save((err, savedProduct) => {
                if (err) {
                  console.log(err);
                  process.exit()
                };
              });
              
              console.log(newProduct);
              
            });
          });
        });
      };
    });
  });
});

