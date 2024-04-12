const { Schema, model, models, SchemaTypes } = require("mongoose");

const CartSchema = new Schema({
//User property with type String  and a reference of User
    user:{
        type: String,
        ref: 'User'
    },
//Garment property with type String and a reference of Garment
    garments:[{
        garmentId:{
            type: String,
            ref: 'Garment'
        },
//Quantity property with type Number and make it required 
        quantity:{
            type: Number, 
            required: true,  
        }  
    }]
  })

  module.exports = models.Cart || model("Cart", CartSchema);