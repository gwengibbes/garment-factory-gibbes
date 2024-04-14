const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

const Garment = require('../models/').Garment;
const Category = require('../models/').Category;
const GarmentCategories = require('../models/').GarmentCategories;
const Cart = require('../models/').Cart;
const axios = require('axios');

async function calculateTaxes(zipCode, cartSubtotal) {

  // Get the tax percentage from the API
  const res = await axios({
    url: 'https://api.api-ninjas.com/v1/salestax',
    params: {
      // Use the zip code provided by the user
      zip_code: zipCode,
    },
    headers: {
      // Get the API key from the environment variable
      'X-Api-Key': process.env['TAX_API_KEY']
    }
  });
  // If no data is returned for the zip code
  if(res.data.length === 0){
    console.log('No tax data found');
    return 0;
  }
  const taxAmount = Number(res.data[0].total_rate);
  return taxAmount * cartSubtotal;
}


router.get("/", async ({ session: { isLoggedIn } }, res) => {
  // Get the Customer favourites category
  const customerFavoritesCategory = await Category.findOne({
    name: 'Customer Favorites'
  }).lean();

  // Get garments that are in the customer favorite category
  const customerFavourites = await GarmentCategories.find({
    category: customerFavoritesCategory._id
  }).populate('garment').limit(3).lean();

  res.render("home", { isLoggedIn,  customerFavourites});
});

router.get('/cart',async ({ session: { isLoggedIn, userId } }, res) => {

  const cart = await Cart.findOne({
    user: userId
  }).populate('garments.garment').lean();
  
  let subTotal = 0;
  cart.garments.forEach(garmentItem =>{
    subTotal = subTotal + (garmentItem.quantity * garmentItem.garment.price)
  })

  let taxes;
  // if a zip code is provided, calclate the tax
  if(cart.zipCode) {
    taxes = await calculateTaxes(cart.zipCode, subTotal);
  }
  
  // return calculated totals
  const cartTotals = {
    subTotal,
    taxes,
    total: subTotal + (taxes || 0),
  };
  res.render("cart", { isLoggedIn,  cart, cartTotals});

});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});

module.exports = router;
