const API_URL = 'http://localhost:3001'; // Your backend server URL


export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`); // Adjust the path as needed

  if (!response.ok) {
    throw new Error('Failed to load products');
  }
  const categories = await response.json();

  return categories;
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`); // Adjust the path as needed

  if (!response.ok) {
    throw new Error('Failed to load products');
  }
  const products = await response.json();
  console.log("products",products);

  return products;
};


export const fetchProductById = async (productId) => {

  const response = await fetch(`${API_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return await response.json();
};


export const fetchProductsByCategoryId = async (categoryId) => {
  // const products = await fetchProducts();
  console.log("a", categoryId);
  const response = await fetch(`${API_URL}/productsbycategory/${categoryId}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return await response.json();

};

// Function to get users
export const getUsers = async () => {
  const response = await fetch('/data/users.json'); // Adjust the path as needed
  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }
  const products = await response.json();

  return products;
};


// export const getUsers = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(usersData);
//     }, 1000); // Simulating a network delay
//   });
// };

// Function to register a new user

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.text(); // Or response.json() if your backend returns JSON
  } catch (error) {
    console.error('Error registering user', error);
    throw error; // Re-throw the error for further handling
  }
};


export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const loggedInUserResult = await response.json();
  console.log(loggedInUserResult);
  let loggedInUser = {name:loggedInUserResult.name, email:loggedInUserResult.email};
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  return { message: 'Login successful!', email };
};

// Function to log out a user
export const logoutUser = () => {
  localStorage.removeItem('loggedInUser');
};


export const addToCart = async (userId, product) => {
  const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, item: product }),
  });
  return response.json();
};

export const placeOrder = async (userId, order) => {
  const response = await fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, order }),
  });
  return response.json();
};