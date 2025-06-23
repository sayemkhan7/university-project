const cart = JSON.parse(localStorage.getItem('cart') || '{}');
const products = {
  1: { name: 'Dress Shoes', price: 49.99 },
  2: { name: 'Chino Pants', price: 39.50 },
  3: { name: 'Oxford Shirt', price: 29.99 },
  4: { name: 'Sneakers', price: 59.99 },
  5: { name: 'Denim Jeans', price: 45.00 },
  6: { name: 'Polo T-Shirt', price: 24.99 }
};

const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const salesDisplay = document.getElementById('total-sales');
const payBtn = document.getElementById('payBtn');
const paymentModal = document.getElementById('paymentModal');
const paymentForm = document.getElementById('paymentForm');
const cancelPaymentBtn = document.getElementById('cancelPayment');
const emptyCartMessage = document.getElementById('emptyCartMessage');

let total = 0;

// Render cart items or show empty message
if (Object.keys(cart).length === 0) {
  emptyCartMessage.classList.remove('hidden');
  payBtn.disabled = true;
  payBtn.classList.add('opacity-50', 'cursor-not-allowed');
} else {
  emptyCartMessage.classList.add('hidden');
  payBtn.disabled = false;
  payBtn.classList.remove('opacity-50', 'cursor-not-allowed');

  for (const [id, qty] of Object.entries(cart)) {
    const product = products[id];
    if (!product) continue;

    const subtotal = product.price * qty;
    total += subtotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'bg-white p-4 rounded shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center border border-purple-200';
    itemDiv.innerHTML = `
      <div>
        <h2 class="font-semibold text-lg text-indigo-700">${product.name}</h2>
        <p class="text-gray-600">$${product.price.toFixed(2)} x ${qty}</p>
      </div>
      <div class="font-bold text-right text-purple-700 mt-2 sm:mt-0">$${subtotal.toFixed(2)}</div>
    `;
    cartItems.appendChild(itemDiv);
  }
}

totalDisplay.textContent = total.toFixed(2);

// Load total sales from localStorage
let totalSales = parseFloat(localStorage.getItem('totalSales') || '0');
salesDisplay.textContent = totalSales.toFixed(2);

// Show payment modal on clicking Pay Now
payBtn.addEventListener('click', () => {
  if (total === 0) {
    alert('Your cart is empty!');
    return;
  }
  paymentModal.classList.remove('hidden');
  // Focus first input for accessibility
  paymentForm.paymentMethod.focus();
});

// Cancel payment modal
cancelPaymentBtn.addEventListener('click', () => {
  paymentModal.classList.add('hidden');
  paymentForm.reset();
  payBtn.focus();
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !paymentModal.classList.contains('hidden')) {
    paymentModal.classList.add('hidden');
    paymentForm.reset();
    payBtn.focus();
  }
});

// Handle payment form submission
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const method = paymentForm.paymentMethod.value;
  const trxId = paymentForm.trxId.value.trim();

  if (!method) {
    alert('Please select a payment method.');
    return;
  }

  if (!trxId) {
    alert('Please enter your transaction ID.');
    return;
  }

  // Confirm payment
  if (confirm(`Confirm payment of $${total.toFixed(2)} using ${method} with transaction ID "${trxId}"?`)) {
    // Update total sales
    const updatedSales = totalSales + total;
    localStorage.setItem('totalSales', updatedSales.toFixed(2));
    totalSales = updatedSales;
    salesDisplay.textContent = totalSales.toFixed(2);

    // Clear cart
    localStorage.removeItem('cart');

    alert('Payment successful! Thank you for your order.');

    // Close modal and redirect
    paymentModal.classList.add('hidden');
    paymentForm.reset();
    window.location.href = 'index.html';
  }
});
