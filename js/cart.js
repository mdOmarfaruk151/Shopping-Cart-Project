let cart = [];  // To hold the items added to the cart

// Add item to the cart
function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;  // If the item is already in the cart, increment the quantity
  } else {
    cart.push({ ...product, quantity: 1 });  // Add the item with quantity 1 if not already in the cart
  }

  updateCartCount();  // Update the cart item count
  updateCartDisplay();  // Update the cart display
}

// Update cart count (number of items in the cart)
function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = cartCount;  // Update the cart count in the UI
}

// Clear cart
function clearCart() {
  cart = [];  // Reset the cart array
  updateCartCount();  // Reset cart count
  updateCartDisplay();  // Reset cart display
  document.getElementById('cartModal').classList.add('hidden');  // Hide the cart modal
}

// Update cart items (quantity and total price)
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';  // Clear the current cart items display

  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;  // Add the total price of this item to the grand total

    const cartItem = document.createElement('div');
    cartItem.classList.add('flex', 'justify-between', 'items-center');
    cartItem.innerHTML = `
      <div class="flex-1">
        <p>${item.name}</p>
        <p class="text-sm text-gray-500">Price: $${item.price}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-300 p-1 rounded-md">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-300 p-1 rounded-md">+</button>
      </div>
      <span class="font-bold">$${itemTotal}</span>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);  // Update the total price
}

// Update item quantity in the cart
function updateQuantity(productId, change) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity = Math.max(1, cartItem.quantity + change);  // Prevent quantity from going below 1
    updateCartCount();
    updateCartDisplay();
  }
}

// Checkout button event
function handleCheckout() {
  const checkoutSummaryContainer = document.getElementById('checkoutSummary');
  checkoutSummaryContainer.innerHTML = '';  // Clear previous summary

  let checkoutTotal = 0;
  
  // Create a summary of the cart items
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    checkoutTotal += itemTotal;

    const itemSummary = document.createElement('div');
    itemSummary.classList.add('flex', 'justify-between', 'items-center');
    itemSummary.innerHTML = `
      <div class="flex-1">
        <p>${item.name} (x${item.quantity})</p>
        <p class="text-sm text-gray-500">Price: $${item.price}</p>
      </div>
      <span class="font-bold">$${itemTotal}</span>
    `;
    checkoutSummaryContainer.appendChild(itemSummary);
  });

  document.getElementById('checkoutTotalPrice').textContent = checkoutTotal.toFixed(2);
  document.getElementById('checkoutModal').classList.remove('hidden');  // Show the checkout modal
}

// Close the checkout modal
function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.add('hidden');
}

// Confirm checkout (for now, just log the cart items and clear it)
function confirmCheckout() {
  console.log('Checkout confirmed', cart);
  cart = [];  // Empty the cart after confirmation
  updateCartCount();  // Reset cart count
  updateCartDisplay();  // Reset cart display
  closeCheckoutModal();  // Close the checkout modal
}

// Event listener for checkout
document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

// Event listener for closing checkout modal
document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckoutModal);

// Event listener for confirming checkout
document.getElementById('confirmCheckoutBtn').addEventListener('click', confirmCheckout);


// Confirm checkout and generate a PDF
function confirmCheckout() {
    console.log('Checkout confirmed', cart);
    
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Add title to the PDF
    doc.setFontSize(16);
    doc.text("Checkout Summary", 20, 20);
  
    let y = 30; // Starting Y position for the items list in the PDF
    let total = 0;
  
    // Add each cart item to the PDF
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      doc.setFontSize(12);
      doc.text(`${item.name} (x${item.quantity}) - $${item.price} each`, 20, y);
      doc.text(`Total: $${itemTotal}`, 150, y);
      y += 10; // Increase the Y position for the next item
    });
  
    // Add the total price to the PDF
    doc.setFontSize(14);
    doc.text(`Total Price: $${total.toFixed(2)}`, 20, y);
  
    // Save the PDF
    doc.save("checkout-summary.pdf");
  
    // Clear the cart after checkout (optional)
    cart = [];
    updateCartCount();  // Reset the cart count
    updateCartDisplay();  // Reset the cart display
    closeCheckoutModal();  // Close the checkout modal
  }
  