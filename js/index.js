// Products data
const products = [
  { id: 1, name: ' Shoes', price: 49.99, image: 'assets/shes.jpg', alt: 'Dress Shoes' },
  { id: 2, name: ' Pants', price: 39.50, image: 'assets/pant.jpg'},
  { id: 3, name: 'watch', price: 29.99, image: 'assets/watch.jpg'},
  { id: 4, name: 'sunglasses', price: 59.99, image:'assets/sunglass.jpg'},
  { id: 5, name: 'Shirt', price: 45.00, image:'assets/shirt.jpg'},
  { id: 6, name: ' T-Shirt', price: 24.99, image: 'assets/t-shirt.jpg', alt: 'Polo T-Shirt' },
];

// Reference to DOM elements
const productsContainer = document.getElementById('products');
const cartCountEl = document.getElementById('cart-count');
const cartBtn = document.getElementById('cartBtn');

// Load cart from localStorage or initialize empty
const cart = JSON.parse(localStorage.getItem('cart') || '{}');

// Render products cards dynamically
function renderProducts() {
  productsContainer.innerHTML = ''; // clear existing
  products.forEach(({id, name, price, image, alt}) => {
    const card = document.createElement('div');
    card.className = "product-card bg-white p-4 rounded shadow hover:shadow-xl transition";
    card.dataset.id = id;
    card.dataset.name = name;
    card.dataset.price = price;

    card.innerHTML = `
      <img src="${image}" alt="${alt}" class="w-full h-40 object-cover rounded" />
      <h2 class="mt-2 text-lg font-semibold text-indigo-700">${name}</h2>
      <p class="text-gray-700">$${price.toFixed(2)}</p>
      <button class="add-btn mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded w-full">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });
}

// Update cart count badge
function updateCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  cartCountEl.textContent = count;
}

// Add event listeners for add to cart buttons
function setupAddButtons() {
  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      const id = card.dataset.id;
      const name = card.dataset.name;

      cart[id] = (cart[id] || 0) + 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();

      alert(`${name} added to cart!`);
    });
  });
}

// Redirect to cart page
function goToCart() {
  window.location.href = 'cart.html';
}

// Initialize app
function init() {
  renderProducts();
  setupAddButtons();
  updateCartCount();
  cartBtn.addEventListener('click', goToCart);
}

// Run on load
window.onload = init;
