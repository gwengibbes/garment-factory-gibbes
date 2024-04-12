const { Schema, model, models, SchemaTypes } = require("mongoose");

const GarmentCategoriesSchema = new Schema({
//Garment Id property with type String and a reference of Garment
   garmentId:{
        type: String,
        ref: 'Garment'
    },
//Category Id property with type String and a reference of Category
    categoryId:{
        type: String,
        ref: 'Category'
    },
  })

  module.exports = models.GarmentCategories || model("GarmentCategories",GarmentCategoriesSchema);