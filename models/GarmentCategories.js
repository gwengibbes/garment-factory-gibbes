const { Schema, model, models, SchemaTypes } = require("mongoose");

const GarmentCategoriesSchema = new Schema({
//Garment Id property with type String and a reference of Garment
garment:{
        type: String,
        ref: 'Garment'
    },
//Category Id property with type String and a reference of Category
    category:{
        type: String,
        ref: 'Category'
    },
  })

  module.exports = models.GarmentCategories || model("GarmentCategories",GarmentCategoriesSchema);