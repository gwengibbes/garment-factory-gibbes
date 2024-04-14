
const Cart = require('../models').Cart;
const Garment = require('../models').Garment;

async function validateAvailableQuantity(desiredQuantity, garment) {
    // Find the garment that the user is interested in
    const garmentItem = await Garment.findById(garment).lean();

    // Check if the garment the user is interested in exists
    if (garmentItem === null) {
        /*
        return a bad request when the garment ID specified was not 
        found in our database
        */
        throw new Error('Garment not found')
    }

    // Check to ensure that we have enough items in stock
    if (desiredQuantity > garmentItem.quantity) {
        // Return an error, when requested amount exceeds our inventory
        throw new Error(`Only ${garmentItem.quantity} items in stock`);
    }
    return garmentItem;
}

async function addToCart(req, res) {

    // Getting the cart details requested by the user
    const { garment, quantity } = req.body;

    try {
        await validateAvailableQuantity(quantity, garment);

        // Once all validations pass, proceed to create/add the item to the cart
        const garments = [{
            garment: garment,
            quantity: quantity,
        }];

        // Get the user from the session
        const user = req.session.userId;

        // Check if the user already has a cart
        let cart = await Cart.findOne({ user });
        // Stores the update we will make
        let updatedCart;

        if (!cart) {
            // If there is not cart for the user, create a new one
            cart = new Cart({ user, garments })
            // SAve the cart
            updatedCart = await cart.save();
        } else {
            let garmentAlreadyInCart = false;
            // Check if the garment is already in the cart
            cart.garments.forEach(garmentItem => {
                if (garmentItem.garment === garment) {
                    // Increment the quantity
                    garmentItem.quantity = garmentItem.quantity + 1;
                    garmentAlreadyInCart = true
                }
            })
            if (garmentAlreadyInCart === false) {
                // Add the garment if it is not in cart
                cart.garments.push({
                    garment: garment,
                    quantity: quantity,
                })
            }
            // Save the updates
            updatedCart = cart.save();
        }
        res.json(updatedCart);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

}

function getCartItems(req, res) {

}

//Delete items in the cart
async function removeFromCart(req, res) {
    const garment = req.params.garmentId
    const user = req.session.userId;
    const cart = await Cart.findOne({ user });

    cart.garments = cart.garments.filter(garmentItem =>{
        return garmentItem.garment !== garment
    });

    const updatedCart = await cart.save();
    return res.status(200).json(updatedCart);
}

async function updateCartData(req, res){
    const userId = req.session.userId;
    // Get the zip code from the request body
    const { zipCode } = req.body;
    console.log('Updaing cart...')
    const cart = await Cart.findOneAndUpdate({
        user: userId
    }, {
        zipCode,
    }).lean();
    res.json(cart)
}


//Find and update the garments that are in the customers cart 
async function updateCart(req, res) {
    // Get the logged in user, so we can know to get their cart
    const userId = req.session.userId;
    // Get the quantity from the request body
    const { quantity } = req.body;
    // Get the garment ID from the request URL (/cart/:garmentId)
    const garmentId = req.params.garmentId;

    try {
        // Checks to ensure that the garment exists and that there is sufficient quantity, before updating the cart
        await validateAvailableQuantity(quantity, garmentId);
        // Find the cart to update the quantity of the garment
        const cart = await Cart.findOne({
            user: userId
        });

        // Find the garment in the cart to update
        let garmentFound = false;
        cart.garments.forEach(garmentObj => {
            // Once found, update with the new quantity
            if (garmentObj.garment === garmentId) {
                garmentObj.quantity = quantity;
                // Update that the garment was found and updated
                garmentFound = true;
            }
        });
        // Return an error if the garment is not found
        if (garmentFound === false) {
            return res.status(400).json({
                error: 'The specified garment was not found in your cart'
            });
        }
        // Save the cart with the updated quantity
        const updatedCart = await cart.save();
        res.json(updatedCart);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


async function emptyCart(req, res) {
    // Get the user from the session
    const user = req.session.userId;
    const cart = await Cart.deleteOne({ user }).lean();
    res.json(cart);
}



module.exports = {
    addToCart,
    getCartItems,
    updateCart,
    removeFromCart,
    emptyCart,
    updateCartData
}