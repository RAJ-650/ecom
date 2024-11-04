// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'yourSecretKey'; // Use a strong secret key in production

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');
const ordersFilePath = path.join(__dirname, 'data', 'orders.json');
const cartFilePath = path.join(__dirname, 'data', 'carts.json');

// Function to read data from JSON file
const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};


// Function to write data to JSON file
const writeJsonFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// User Registration
app.post('/register', async (req, res) => {
  const newUser = req.body;

  try {
    const users = await readJsonFile(usersFilePath);
    const existingUser = users.find(user => user.email === newUser.email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    users.push(newUser);
    await writeJsonFile(usersFilePath, users);

     res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error saving user data' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await readJsonFile(usersFilePath);
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Get Products
app.get('/products', async (req, res) => {
  try {
    const products = await readJsonFile(productsFilePath);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get Product by ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const products = await readJsonFile(productsFilePath);
    const product = products.find(p => p.id === parseInt(id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Update Product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    
    try {
        const products = await readJsonFile(productsFilePath);
        const productIndex = products.findIndex(p => p.id === parseInt(id));
        
        if (productIndex !== -1) {
            products[productIndex] = { id: parseInt(id), ...updatedProduct };
            await writeJsonFile(productsFilePath, products);
            res.json(products[productIndex]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Get Product by ID
app.get('/productsbycategory/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const products = await readJsonFile(productsFilePath);
      const filteredProducts = products.filter(product => product.categoryId == id);

      if (filteredProducts) {
        res.json(filteredProducts);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  });
  
// Get Categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await readJsonFile(categoriesFilePath);
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Add to cart endpoint

// Add to cart endpoint
app.post('/cart', (req, res) => {
  const { userId, item } = req.body;
  const cartData = loadData('carts.json');

  // Initialize user's cart if it doesn't exist
  if (!cartData[userId]) {
      cartData[userId] = [];
  }

  // Add item to the user's cart
  cartData[userId].push(item);
  saveData('cart.json', cartData);
  res.json(cartData[userId]);
});

// Place order endpoint
app.post('/order', (req, res) => {
  const { userId, order } = req.body;
  const orderData = loadData('orders.json');

  // Initialize user's orders if it doesn't exist
  if (!orderData[userId]) {
      orderData[userId] = [];
  }

  // Add order to the user's orders
  orderData[userId].push(order);
  saveData('orders.json', orderData);
  res.json(orderData[userId]);
});


// Load data from JSON files
const loadData = (file) => {
  return JSON.parse(fs.readFileSync(file));
};

// Save data to JSON files
const saveData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
