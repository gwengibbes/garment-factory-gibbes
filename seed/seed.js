if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
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

  const menCategory = await Category.create({ name: "Men" });
  await Category.create({ name: "Women" });
  await Category.create({ name: "Sale" });
  await Category.create({ name: "Customer Favorites" });
  await Category.create({ name: "New Releases" });

  // Garments
  const redShirt =  await Garment.create({ 
    name: "Sample red shirt", 
    type: 'shirt', 
    color: 'red', 
    size: 'small', 
    price: 50, 
    sku: 't-12', 
    quantity: 100 
  });

  const blueShirt =  await Garment.create({ 
    name: "Sample orange shirt", 
    type: 'shirt', 
    color: 'orange', 
    size: 'small', 
    price: 50, 
    sku: 't-12', 
    quantity: 100 
  });

  await GarmentCategories.create({garmentId: redShirt._id, categoryId: menCategory._id });
  await GarmentCategories.create({garmentId: blueShirt._id,categoryId: menCategory._id });

  connection.close();
});
