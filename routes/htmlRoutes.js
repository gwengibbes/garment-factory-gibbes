const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

const Garment = require('../models/').Garment;
const Category = require('../models/').Category;
const GarmentCategories = require('../models/').GarmentCategories;
const Cart = require('../models/').Cart;
const axios = require('axios');

async function calculateTaxes(zipCode, cartSubtotal) {
try {
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
  if (res.data.length === 0) {
    console.log('No tax data found');
    return 0;
  }
  const taxAmount = Number(res.data[0].total_rate);
  return taxAmount * cartSubtotal;
} catch(error){
  return 0;
}
}



router.get("/", async ({session: {isLoggedIn}}, res) => {
  // Get the Customer favourites category
  const customerFavoritesCategory = await Category.findOne({
    name: 'Customer Favorites'
  }).lean();

  const newReleasesCategory = await Category.findOne({
    name: 'New Releases'
  }).lean();

  const allCategories = await Category.find().lean();

  // Get garments that are in the customer favorite category
  const customerFavourites = await GarmentCategories.find({
    category: customerFavoritesCategory._id
  }).populate('garment').limit(3).lean();

  const newReleases = await GarmentCategories.find({
    category: newReleasesCategory._id
  }).populate('garment').limit(3).lean();

  res.render("home", {isLoggedIn, customerFavourites, newReleases, allCategories});
});

router.get('/cart', async ({session: {isLoggedIn, userId}}, res) => {

  const allCategories = await Category.find().lean();

  const cart = await Cart.findOne({
    user: userId
  }).populate('garments.garment').lean();

  if(!cart){
    res.render("cart", {isLoggedIn});
    return;
  }

  let subTotal = 0;
  cart.garments.forEach(garmentItem => {
    subTotal = subTotal + (garmentItem.quantity * garmentItem.garment.price)
  })

  let taxes;
  // if a zip code is provided, calclate the tax
  if (cart.zipCode) {
    taxes = await calculateTaxes(cart.zipCode, subTotal);
  }

  // return calculated totals
  const cartTotals = {
    subTotal,
    taxes,
    total: subTotal + (taxes || 0),
  };
  res.render("cart", {isLoggedIn, cart, cartTotals, allCategories});

});

// Creates the page to show garments for each category
router.get('/products', async (req, res) => {
  const {isLoggedIn} = req.session;
  const allCategories = await Category.find().lean();
  // Get the category the user is browsing from the query string
  const categoryId = req.query.category
  // Find all garments in that category, and populate the garment and category properties
  const garmentsInCategory = await GarmentCategories.find({
    category: categoryId
  }).populate(['garment', 'category']).lean();
  let category;
  // Check to ensure that the category has garments
  if(garmentsInCategory.length>0){
    category = garmentsInCategory[0].category;
  }
  // Render items
  res.render("products", {isLoggedIn, category, garments: garmentsInCategory, allCategories});
})

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", {error: req.query.error});
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", {error: req.query.error});
});

router.get("/private", checkAuth, ({session: {isLoggedIn}}, res) => {
  res.render("protected", {isLoggedIn});
});

module.exports = router;
