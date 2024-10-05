const cartContainer = document.querySelector('.cart');
const cartTitle = cartContainer.querySelector('h2');
const cartIcon = cartContainer.querySelector('.cart-icon');
const cartItems = [];

//cart display
function updateCart() {
    cartTitle.textContent = `Your Cart (${cartItems.length})`;
    cartIcon.innerHTML = ''; 

    if (cartItems.length === 0) {
        cartIcon.innerHTML = '<img class="add-to-carticon" src="images/illustration-empty-cart.svg" alt="Empty Cart"><p>Your added items will appear here</p>';
    } else {
        let total = 0;
        const itemList = document.createElement('div');

        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name} (x${item.quantity})</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            itemList.appendChild(itemElement);
        });

        const totalElement = document.createElement('p');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        itemList.appendChild(totalElement);
        cartIcon.appendChild(itemList);
    }
}

//add item to cart
function addToCart(name, price, image) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        cartItems.push({ name, price, image, quantity: 1 });
    }
    updateCart();
}

//remove item from cart
function removeItem(index) {
    cartItems[index].quantity -= 1;
    if (cartItems[index].quantity === 0) {
        cartItems.splice(index, 1); 
    }
    updateCart();
}

// Add event listeners to buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
    const dessertCard = button.parentElement;
    const name = dessertCard.querySelector('h2').textContent;
    const price = parseFloat(dessertCard.querySelector('.price').textContent.replace('$', ''));
    const image = dessertCard.querySelector('img').src;

    button.addEventListener('click', () => {
        addToCart(name, price, image);
    });
});

// Function to clear cart
function clearCart() {
    cartItems.length = 0;
    updateCart();
}

//clear cart button
const clearCartButton = document.createElement('button');
clearCartButton.textContent = 'Clear Cart';
clearCartButton.addEventListener('click', clearCart);
cartContainer.appendChild(clearCartButton);

// Checkout button
const checkoutButton = document.createElement('button');
checkoutButton.textContent = 'Checkout';
checkoutButton.addEventListener('click', () => {
alert('Thank you for your purchase!');
     clearCart(); 
 });
cartContainer.appendChild(checkoutButton);

//removing items
cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.dataset.index;
        removeItem(index);
    }
});

