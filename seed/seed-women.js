
const {Category, Garment, GarmentCategories} = require("../models");

module.exports = async (newReleasesCategory) => {
// Garments women's sleeveless shirt size xsmall
  const redSleevelessShirtXsm = await Garment.create({
    name: "Sample red sleeveless shirt",
    type: 'sleeveless shirt',
    color: 'red',
    size: 'xsmall',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'women-s-sleeveless-vest-red.png'
  });

  const whiteSleevelessShirtXsm = await Garment.create({
    name: "Sample white sleeveless shirt",
    type: 'sleeveless shirt',
    color: 'white',
    size: 'xsmall',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'women-s-sleeveless-vest-white.png'
  });

// Garments women's sleeveless shirt size small   
  const redSleevelessShirtSm = await Garment.create({
    name: "Sample red sleeveless shirt",
    type: 'sleeveless shirt',
    color: 'red',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'women-s-sleeveless-vest-red.png',
  });

  const whiteSleevelessShirtSm = await Garment.create({
    name: "Sample white sleeveless shirt",
    type: 'sleeveless shirt',
    color: 'white',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'women-s-sleeveless-vest-white.png'
  });


  const womenCategory = await Category.create({ name: "Women" });
  await GarmentCategories.create({garment: redSleevelessShirtXsm._id, category: womenCategory._id});
  await GarmentCategories.create({garment: whiteSleevelessShirtXsm._id, category: womenCategory._id});

  await GarmentCategories.create({garment: redSleevelessShirtSm._id, category: womenCategory._id});
  await GarmentCategories.create({garment: whiteSleevelessShirtSm._id, category: womenCategory._id});

  await GarmentCategories.create({garment: redSleevelessShirtSm._id, category: newReleasesCategory._id });
};