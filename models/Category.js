const { Schema, model, models, SchemaTypes, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
    name:{
        type: String,
        required: true,
    },
  })

  module.exports = models.Category || model("Category", CategorySchema);
