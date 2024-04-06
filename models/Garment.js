const { Schema, model, models, SchemaTypes } = require("mongoose");

const GarmentSchema = new Schema({
    name:{
        type: String, 
        required: true,  
    },
    type:{
        type: String, 
        required: true,  
        enum:['shirt','pants']
    },
    color:{
        type: String, 
        required: true,  
        enum:['red','orange']
    },
    size:{
        type: String, 
        required: true,  
        enum:['small','medium']
    },
    price:{
        type: Number, 
        required: true,  
    },
    sku:{
        type: String, 
        required: true,  
        unique: true,
    },
    quantity:{
        type: Number, 
        required: true,  
    },

  })

  module.exports = models.Garment || model("Garment", GarmentSchema);