// Garments men's polo shirt size small 
const {Category, Garment, GarmentCategories} = require("../models");

module.exports = async (newReleasesCategory) => {


  const blackPoloShirtSm = await Garment.create({
    name: "Sample black polo shirt",
    type: 'polo shirt',
    color: 'black',
    size: 'small',
    price: 50,
    // TODO: Generate random string for the SKU
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-black.png'
  });

  const greenPoloShirtSm = await Garment.create({
    name: "Sample green polo shirt",
    type: 'polo shirt',
    color: 'green',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-green.png'
  });

  const greyPoloShirtSm = await Garment.create({
    name: "Sample grey polo shirt",
    type: 'polo shirt',
    color: 'grey',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-grey.png'
  });

  const lightGreenPoloShirtSm = await Garment.create({
    name: "Sample light green polo shirt",
    type: 'polo shirt',
    color: 'light green',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-light-green.png'
  });

  const orangePoloShirtSm = await Garment.create({
    name: "Sample orange polo shirt",
    type: 'polo shirt',
    color: 'orange',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-orange.png'
  });

  const redPoloShirtSm = await Garment.create({
    name: "Sample red polo shirt",
    type: 'polo shirt',
    color: 'red',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-red.png'
  });

  const tealPoloShirtSm = await Garment.create({
    name: "Sample teal polo shirt",
    type: 'polo shirt',
    color: 'teal',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-teal.png'
  });

  const menCategory = await Category.create({name: "Men"});

  await GarmentCategories.create({garment: blackPoloShirtSm._id, category: menCategory._id});
  await GarmentCategories.create({garment: greenPoloShirtSm._id, category: menCategory._id});
  await GarmentCategories.create({garment: greyPoloShirtSm._id, category: menCategory._id});
  await GarmentCategories.create({garment: lightGreenPoloShirtSm._id, category: menCategory._id});
  await GarmentCategories.create({garment: orangePoloShirtSm._id, category: menCategory._id});
  await GarmentCategories.create({garment: redPoloShirtSm._id, category: menCategory._id});
  await GarmentCategories.create({garment: tealPoloShirtSm._id, category: menCategory._id});



  await GarmentCategories.create({garment: tealPoloShirtSm._id, category: newReleasesCategory._id });
  await GarmentCategories.create({garment: orangePoloShirtSm._id, category: newReleasesCategory._id });

};
