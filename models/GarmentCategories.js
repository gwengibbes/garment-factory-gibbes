const { Schema, model, models, SchemaTypes } = require("mongoose");

const GarmentCategoriesSchema = new Schema({
   garmentId:{
        type: String,
        ref: 'Garment'
    },
    categoryId:{
        type: String,
        ref: 'Category'
    },
  })

  module.exports = models.GarmentCategories || model("GarmentCategories",GarmentCategoriesSchema);