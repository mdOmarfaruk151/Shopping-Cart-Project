// Toggle cart modal visibility
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.toggle('hidden');
    updateCartDisplay();  // Update the cart display when the modal is opened
  });
  
  // Clear cart button event
  document.getElementById('clearCartBtn').addEventListener('click', () => {
    clearCart();
  });
  
  // Checkout button event (display summary)
  document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
  
  // Close checkout modal event
  document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckoutModal);
  
  // Confirm checkout button event (log cart and clear it)
  document.getElementById('confirmCheckoutBtn').addEventListener('click', confirmCheckout);
  