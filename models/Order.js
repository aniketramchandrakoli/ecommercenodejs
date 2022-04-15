const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        orderdate : {
            type: Date
        },
        productid : {
            type: String
        },
        size : {
            type: String
        },
        color : {
            type: String
        },
        name : {
            type: String
        },
        email : {
            type: String
        },
        mobileno : {
            type: String
        },
        address : {
            type: String
        },
        pincode : {
            type: String
        },
        quantity : {
            type: Number
        },
        price : {
            type: Number
        },
        shipping : {
            type: Number
        },
        total : {
            type: String
        },
        imagepath: {
            type: String       
        },
        status : {
            type: String
        },
    }
)
const Order = mongoose.model("orders", schema);

module.exports = Order;