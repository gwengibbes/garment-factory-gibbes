async function addToCart(garment, quantity = 1) {
    // Constructing the data to be saved to the cart
    const data = { garment, quantity };
    // Calling the API to add the item to the cart
    const response = await fetch('/api/cart', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
    });
    // parses JSON response into native JavaScript objects
    return response.json();
}

async function updateGarmentQuantity(garmentId, quantity) {
    // Constructing the data to be saved to the cart
    const data = { quantity };
    // Calling the API to add the item to the cart
    const response = await fetch(`/api/cart/${garmentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
    });
    if(!response.ok) {
        const error = await response.json();
        alert(`Unable to update quantity: ${error.error}`);
    }
    // parses JSON response into native JavaScript objects
    return response.json();
}

async function deleteItemFromCart(garmentId) {

    // Calling the API to add the item to the cart
    const response = await fetch(`/api/cart/${garmentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    
    // parses JSON response into native JavaScript objects
    return response.json();
}

async function emptyCart() {

    // Calling the API to add the item to the cart
    const response = await fetch(`/api/cart`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    // parses JSON response into native JavaScript objects
    return response.json();
}


async function addZipCode(zipCode) {
    // Constructing the data to be saved to the cart
    const data = { zipCode };
    // Calling the API to add the item to the cart
    const response = await fetch(`/api/cart`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
    });
    // parses JSON response into native JavaScript objects
    return response.json();
}

function setupClickEventForAddToCart() {
    // Get all the add to cart buttons on screen, so that we can wire up the click event
    const addToCartButtonsEl = document.querySelectorAll('.btn-add-to-cart');

    // Add the click event to each button
    addToCartButtonsEl.forEach(addToCartButtonEl => {
        addToCartButtonEl.addEventListener('click', async (event) => {
            // Gets the ID of the garment from the data element
            const garmentId = addToCartButtonEl.getAttribute('data-garment');
            await addToCart(garmentId);
            // Send the user to the cart page
            window.location = '/cart';
        })
    });
}

function setupClickEventForUpdateQuantity() {
    // Get all the update quantity buttons on the cart screen
    const updateQuantityButtonsEl = document.querySelectorAll('.btn-update-quantity');
    // Add the click event to each button
    updateQuantityButtonsEl.forEach(updateQuantityButtonEl => {
        updateQuantityButtonEl.addEventListener('click', async (event) => {
            // Gets the ID of the garment from the data element
            const garmentId = updateQuantityButtonEl.getAttribute('data-garment');
            const quantityEl = document.getElementById(`quantity_${garmentId}`)
            const quantity = quantityEl.value;
            await updateGarmentQuantity(garmentId, quantity);
            window.location.reload();
        })
    });
}

function setupClickEventForDeletingCartItem() {
    // Get all the update quantity buttons on the cart screen
    const removeFromCartButtonsEl = document.querySelectorAll('.btn-remove-from-cart');
    // Add the click event to each button
    removeFromCartButtonsEl.forEach(removeFromCartButtonEl => {
        removeFromCartButtonEl.addEventListener('click', async (event) => {
            // Gets the ID of the garment from the data element
            const garmentId = removeFromCartButtonEl.getAttribute('data-garment');
            
            await deleteItemFromCart(garmentId);
            window.location.reload();
        })
    });
}

function setupClickEventToEmptyCart() {
    const emptyCartEl = document.getElementById('btnEmptyCart');
    // If we're in the homepage, the empty cart button will not be present
    if(!emptyCartEl){
        return;
    }
    emptyCartEl.addEventListener('click', async ()=>{
        await emptyCart();
        window.location.reload();
    });
}

function setupClickEventToAddZipCode() {
    const addZipCodeEl = document.getElementById('addZipCode');
    const zipCodeInputEl = document.getElementById('zipCode');
    // If we're in the homepage, the empty cart button will not be present
    if(!addZipCodeEl){
        return;
    }
    

    addZipCodeEl.addEventListener('click', async ()=>{
        const zipCode = zipCodeInputEl.value
        if(!zipCode) {
            console.log('No zip code added');
            return;
        }
        await addZipCode(zipCode);
        window.location.reload();
    });
}





setupClickEventForAddToCart();
setupClickEventForUpdateQuantity();
setupClickEventForDeletingCartItem();
setupClickEventToEmptyCart();
setupClickEventToAddZipCode();

