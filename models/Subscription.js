var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({

    email : {
        type : String,
        required : true
    }
})

var Subscription = mongoose.model("subscription",schema);

module.exports = Subscription;