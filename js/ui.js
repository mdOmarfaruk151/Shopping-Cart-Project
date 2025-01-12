document.getElementById('cartBtn').addEventListener('click', () => {
  document.getElementById('checkoutModal').classList.remove('hidden');
});

document.getElementById('closeCheckoutBtn').addEventListener('click', () => {
  document.getElementById('checkoutModal').classList.add('hidden');
});

document.getElementById('applyPromoCode').addEventListener('click', applyPromoCode);
