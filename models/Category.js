const { Schema, model, models, SchemaTypes, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
//Name property with type String  and make it required
    name:{
        type: String,
        required: true,
    },
  })

  module.exports = models.Category || model("Category", CategorySchema);
