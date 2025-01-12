// Array to hold the products data
let products = [];

// Fetch products from JSON file and display them
function fetchProducts() {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      products = data; // Store products data globally
      displayProducts(products); // Call the function to display products
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Display products in the UI
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  
  if (products.length === 0) {
    productList.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product', 'border', 'rounded-lg', 'p-4', 'shadow-md', 'bg-white');
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="rounded-lg mb-2 h-40 ">
      <h3 class="text-lg font-semibold">${product.name}</h3>
      <p class="text-sm text-gray-500">${product.description}</p>
      <p class="text-lg font-bold">$${product.price}</p>
      <button onclick="addToCart(${product.id})" class="mt-2 bg-blue-500 hover:bg-blue-800 text-white p-2 rounded-md">Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });
}

// Call the fetchProducts function on page load
fetchProducts();
