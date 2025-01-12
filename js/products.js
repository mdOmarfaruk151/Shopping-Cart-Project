// Fetch products from the JSON file and display them
async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display products on the page
function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'bg-white p-4 rounded shadow';
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-45 object-cover mb-4">
      <h3 class="font-bold text-lg">${product.name}</h3>
      <p class="text-gray-500">${product.description}</p>
      <p class="font-bold">$${product.price}</p>
      <button class="mt-2 bg-blue-500 text-white py-1 px-4 rounded" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
  });
}

fetchProducts();
