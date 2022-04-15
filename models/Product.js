const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    sizes: {
        type: Array       
    },
    colors: {
        type: Array       
    },
    mrp: {
        type: Number
    },
    price: {
        type: Number        
    },
    instock: {
        type: String
    },
    status: {
        type: String       
    },
    sku: {
        type: String       
    },
    imagepath: {
        type: String       
    },

   
})

const Product = mongoose.model("products", schema);

module.exports = Product;
