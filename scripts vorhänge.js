const imageContainer = document.getElementById('image-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const thumbnails = document.querySelectorAll('.thumbnails img');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let currentIndex = 0;

function updateSlider() {
  const imageWidth = imageContainer.children[0].offsetWidth;
  imageContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentIndex);
  });
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < imageContainer.children.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

function goToImage(index) {
  currentIndex = index;
  updateSlider();
}

function updatePrice() {
  const width = parseFloat(document.getElementById("width").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const variant = document.getElementById("variant").value;
  const gleiter = document.getElementById("gleiter").value;
  const color = document.getElementById("color").value;
  const priceElement = document.querySelector(".current-price");
  const pricePerSquareMeter = 15;
  const area = width * height;
  let totalPrice = area * pricePerSquareMeter;

  const variantCosts = { clic: 0, ösen: 5, schlaufen: 3, wave: 7 };
  const gleiterCosts = { gleiter1: 0, gleiter2: 2, gleiter3: 3, gleiter4: 4 };
  const colorCosts = { weiss: 0, grau: 2, beige: 2, blau: 3 };
  totalPrice += variantCosts[variant] || 0;
  totalPrice += gleiterCosts[gleiter] || 0;
  totalPrice += colorCosts[color] || 0;

  const minPrice = 20;
  totalPrice = Math.max(totalPrice, minPrice);
  priceElement.textContent = `${totalPrice.toFixed(2)} Fr.`;
  return totalPrice;
}

function addToCart() {
  const name = document.querySelector(".product-details h1").textContent;
  const price = updatePrice();
  const width = parseFloat(document.getElementById("width").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const variant = document.getElementById("variant").value;
  const gleiter = document.getElementById("gleiter").value;
  const color = document.getElementById("color").value;

  cartItems.push({ 
    name: `${name} (${width}m x ${height}m, ${variant}, ${gleiter}, ${color})`, 
    price: price 
  });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCart();
  alert(`${name} wurde zum Warenkorb hinzufügen!`);
  window.location.href = 'Warenkorb.html';
}

function updateCart() {
  cartCount.textContent = cartItems.length;
  cartItemsList.innerHTML = cartItems.length === 0 ? '<li>Der Warenkorb ist leer</li>' : '';
  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">${item.price.toFixed(2)}Fr</span>
      <button class="remove-item" data-index="${index}">Entfernen</button>
    `;
    cartItemsList.appendChild(li);
  });
  const removeButtons = cartItemsList.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCart();
    });
  });
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

window.onload = () => {
  updatePrice();
  updateSlider();
  updateCart();
};