const { Schema, model, models, SchemaTypes } = require("mongoose");

const CartSchema = new Schema({
    user:{
        type: String,
        ref: 'User'
    },
    garments:[{
        garmentId:{
            type: String,
            ref: 'Garment'
        },
        quantity:{
            type: Number, 
            required: true,  
        }  
    }]
  })

  module.exports = models.Cart || model("Cart", CartSchema);