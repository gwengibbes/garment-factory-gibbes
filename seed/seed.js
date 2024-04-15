const seedMenGarments = require('./seed-men');
const seedWomenGarments = require('./seed-women');
if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log("\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

const { User, Category, Garment, GarmentCategories } = require("../models");
const { connection } = require("../config/connection");

connection.once("open", async function () {
  // insert a sample user
  await User.create({ username: "gwen", password: "meatloaf" });

  const newReleasesCategory = await Category.create({ name: "New Releases" });

  seedMenGarments(newReleasesCategory);
  seedWomenGarments(newReleasesCategory)


  const saleCategory = await Category.create({ name: "Sale" });
  const customerFavoritesCategory = await Category.create({ name: "Customer Favorites" });


  // Garments men's polo shirt size small 
  const blackPoloShirtSm =  await Garment.create({
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

  const greenPoloShirtSm =  await Garment.create({
    name: "Sample green polo shirt",
    type: 'polo shirt',
    color: 'green',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-green.png'
  });

  const greyPoloShirtSm =  await Garment.create({
    name: "Sample grey polo shirt",
    type: 'polo shirt',
    color: 'grey',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100,
    image: 'men-s-polo-shirt-grey.png'
  });

  const lightGreenPoloShirtSm =  await Garment.create({
    name: "Sample light green polo shirt",
    type: 'polo shirt',
    color: 'light green',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const orangePoloShirtSm =  await Garment.create({
    name: "Sample orange polo shirt",
    type: 'polo shirt',
    color: 'orange',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const redPoloShirtSm =  await Garment.create({
    name: "Sample red polo shirt",
    type: 'polo shirt',
    color: 'red',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const tealPoloShirtSm =  await Garment.create({
    name: "Sample teal polo shirt",
    type: 'polo shirt',
    color: 'teal',
    size: 'small',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

// Garments men's shirt polo size medium  
const blackPoloShirtMd =  await Garment.create({
  name: "Sample black polo shirt",
  type: 'polo shirt',
  color: 'black',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

const greenPoloShirtMd =  await Garment.create({
  name: "Sample green polo shirt",
  type: 'polo shirt',
  color: 'green',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

const greyPoloShirtMd =  await Garment.create({
  name: "Sample grey polo shirt",
  type: 'polo shirt',
  color: 'grey',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

const lightGreenPoloShirtMd =  await Garment.create({
  name: "Sample light green polo shirt",
  type: 'polo shirt',
  color: 'light green',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

const orangePoloShirtMd =  await Garment.create({
  name: "Sample orange polo shirt",
  type: 'polo shirt',
  color: 'orange',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

const redPoloShirtMd =  await Garment.create({
  name: "Sample red polo shirt",
  type: 'polo shirt',
  color: 'red',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

const tealPoloShirtMd =  await Garment.create({
  name: "Sample teal polo shirt",
  type: 'polo shirt',
  color: 'teal',
  size: 'medium',
  price: 50,
  sku: 't-12',
  quantity: 100
});

  // Garments men's shirt polo size large  
  const blackPoloShirtLg =  await Garment.create({
    name: "Sample black polo shirt",
    type: 'polo shirt',
    color: 'black',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const greenPoloShirtLg =  await Garment.create({
    name: "Sample green polo shirt",
    type: 'polo shirt',
    color: 'green',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const greyPoloShirtLg =  await Garment.create({
    name: "Sample grey polo shirt",
    type: 'polo shirt',
    color: 'grey',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const lightGreenPoloShirtLg =  await Garment.create({
    name: "Sample light green polo shirt",
    type: 'polo shirt',
    color: 'light green',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const orangePoloShirtLg =  await Garment.create({
    name: "Sample orange polo shirt",
    type: 'polo shirt',
    color: 'orange',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const redPoloShirtLg =  await Garment.create({
    name: "Sample red polo shirt",
    type: 'polo shirt',
    color: 'red',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const tealPoloShirtLg =  await Garment.create({
    name: "Sample teal polo shirt",
    type: 'polo shirt',
    color: 'teal',
    size: 'large',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  // Garments men's shirt polo size XL   
  const blackPoloShirtXl =  await Garment.create({
    name: "Sample black polo shirt",
    type: 'polo shirt',
    color: 'black',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const greenPoloShirtXl =  await Garment.create({
    name: "Sample green polo shirt",
    type: 'polo shirt',
    color: 'green',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const greyPoloShirtXl =  await Garment.create({
    name: "Sample grey polo shirt",
    type: 'polo shirt',
    color: 'grey',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const lightGreenPoloShirtXl =  await Garment.create({
    name: "Sample light green polo shirt",
    type: 'polo shirt',
    color: 'light green',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const orangePoloShirtXl =  await Garment.create({
    name: "Sample orange polo shirt",
    type: 'polo shirt',
    color: 'orange',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const redPoloShirtXl =  await Garment.create({
    name: "Sample red polo shirt",
    type: 'polo shirt',
    color: 'red',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  const tealPoloShirtXl =  await Garment.create({
    name: "Sample teal polo shirt",
    type: 'polo shirt',
    color: 'teal',
    size: 'XL',
    price: 50,
    sku: 't-12',
    quantity: 100
  });

  await GarmentCategories.create({garment: greenPoloShirtSm._id, category: customerFavoritesCategory._id });
  await GarmentCategories.create({garment: blackPoloShirtSm._id, category: customerFavoritesCategory._id });
  await GarmentCategories.create({garment: greyPoloShirtSm._id, category: customerFavoritesCategory._id });

  // TODO: Associate each garment with a category

  connection.close();
});
