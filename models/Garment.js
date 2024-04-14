const { Schema, model, models, SchemaTypes } = require("mongoose");

const GarmentSchema = new Schema({
//Name property with type String  and make it required. 
    name:{
        type: String, 
        required: true,  
    },
    image:{
        type: String
    },
//Type property with type String, make it required and define a set of named types of clothing
    type:{
        type: String, 
        required: true,
        // TODO: Add all the possible types from the seed file
        // enum:['shirt','pants']
    },
//Color property with type String, make it required and define a set of named colors
    color:{
        type: String, 
        required: true,  
        // TODO: Add all the possible types from the seed file
        // enum:['red','orange']
    },
//Size property with type String, make it required and define a set of named sizes
    size:{
        type: String, 
        required: true,  
        // TODO: Add all the possible types from the seed file
        // enum:['small','medium']
    },
//Price property with type NUmber and make it required 
    price:{
        type: Number, 
        required: true,  
    },
//Stock Keeping Unit identifier property with type String, make it required and make each identifier unique
    sku:{
        type: String, 
        required: true,  
        // unique: true,
    },
//Quantity property with type Number and make it required 
    quantity:{
        type: Number, 
        required: true,  
    },

  })

  module.exports = models.Garment || model("Garment", GarmentSchema);