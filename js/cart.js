let cart = [];
let appliedPromoCode = null;

function addToCart(productId) {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartCount();
      updateCartDisplay();
    });
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

function updateCartDisplay() {
  const summary = document.getElementById('checkoutSummary');
  summary.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const itemElement = document.createElement('div');
    itemElement.className = 'flex justify-between items-center';
    itemElement.innerHTML = `
      <div>
        <p>${item.name} (x${item.quantity})</p>
        <p class="text-sm text-gray-500">$${item.price}</p>
      </div>
      <span class="font-bold">$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    summary.appendChild(itemElement);
  });

  document.getElementById('checkoutSubtotal').textContent = subtotal.toFixed(2);
  updateCheckoutSummary();
}

function applyPromoCode() {
  const code = document.getElementById('promoCode').value.trim().toLowerCase();
  let discount = 0;

  if (code === 'ostad10' && !appliedPromoCode) {
    discount = 0.1;
    appliedPromoCode = 'ostad10';
  } else if (code === 'ostad5' && !appliedPromoCode) {
    discount = 0.05;
    appliedPromoCode = 'ostad5';
  } else {
    alert('Invalid or already used promo code');
    return;
  }

  updateCheckoutSummary(discount);
}

function updateCheckoutSummary(discount = 0) {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  document.getElementById('checkoutDiscount').textContent = discountAmount.toFixed(2);
  document.getElementById('checkoutTotalPrice').textContent = total.toFixed(2);
}

document.getElementById('confirmCheckoutBtn').addEventListener('click', () => {
  alert('Order placed successfully!');
  cart = [];
  updateCartCount();
  updateCartDisplay();
});
