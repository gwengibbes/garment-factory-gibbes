const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

router.post('/cart', controllers.cart.addToCart);
router.put('/cart', controllers.cart.updateCartData); //update cart 
router.delete('/cart', controllers.cart.emptyCart); // delete/empty the cart
router.put('/cart/:garmentId', controllers.cart.updateCart); //update cart 
router.delete('/cart/:garmentId', controllers.cart.removeFromCart); //remove from cart

module.exports = router;


// v8FDql5gjiFuxAwXwhwHsg==mNaSiTUt69QDdncq