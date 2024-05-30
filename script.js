// Check if localStorage cart exists, if not, create an empty cart
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add item to cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart'));
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `${item.name} - ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.innerText = total.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to handle checkout process

function checkout() {
    documemt.getElementById('checkout-button').addEventListener('click',function(){
        window.location.herf= 'checkout.html';
    })
    const cartTotal = document.getElementById('cart-total');
    const name = document.getElementById('name').value; // Get name from form input
    const email = document.getElementById('email').value; // Get email from form input

    // Validate form inputs
    if (name.trim() === '' || email.trim() === '') {
        alert('Please enter your name and email.');
        return;
    }

    // If cart is empty, display alert
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // Proceed with checkout process (simulated for demonstration)
    alert(`Thank you, ${name}! Your order has been placed. You will receive a confirmation email at ${email}.`);

    // Clear cart after successful checkout
    cart = [];
    updateCart(); // Update cart display
    // Redirect to payment page or handle checkout process
}

// Initialize cart on page load
window.onload = updateCart;

// Function to handle payment form submission
function handlePayment(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve form data
    const formData = new FormData(event.target);
    const cardNumber = formData.get('card-number');
    const expirationDate = formData.get('expiration-date');
    const cvv = formData.get('cvv');

    // Validate form inputs
    if (!isValidCardNumber(cardNumber)) {
        alert('Please enter a valid card number.');
        return;
    }

    if (!isValidExpirationDate(expirationDate)) {
        alert('Please enter a valid expiration date (MM/YY).');
        return;
    }

    if (!isValidCVV(cvv)) {
        alert('Please enter a valid CVV.');
        return;
    }

    // Process payment (simulated for demonstration)
    alert('Payment successful! Thank you for your purchase.');

    // Optionally, clear form inputs after successful payment
    event.target.reset();
}

// Function to validate card number
function isValidCardNumber(cardNumber) {
    return /^\d{16}$/.test(cardNumber); // Validate if card number consists of 16 digits
}

// Function to validate expiration date
function isValidExpirationDate(expirationDate) {
    const currentDate = new Date();
    const [month, year] = expirationDate.split('/');
    const expirationMonth = parseInt(month, 10);
    const expirationYear = parseInt(year, 10) + 2000; // Assuming the year is in the format YY

    // Validate if expiration date is in the future
    return expirationMonth >= 1 && expirationMonth <= 12 &&
           expirationYear >= currentDate.getFullYear() &&
           (expirationYear > currentDate.getFullYear() || expirationMonth >= (currentDate.getMonth() + 1));
}

// Function to validate CVV
function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv); // Validate if CVV consists of 3 digits
}

// Add event listener to the payment form for form submission
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', handlePayment);