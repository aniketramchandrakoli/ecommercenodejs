var express = require("express");
var bodyparser = require("body-parser");
var jsonparser = bodyparser.json();
var nodemailer = require('nodemailer');
const router = express.Router();
const Order = require("../models/Order");
const { send } = require("express/lib/response");

router.post("/place", async (req, res) => {
    let body = req.body;
    let order = Order();
    order.orderdate = new Date();
    order.productid = body.data.productid;
    order.size = body.data.size;
    order.color = body.data.color;
    order.date = body.data.date;
    order.name = body.data.name;
    order.email = body.data.email;
    order.mobileno = body.data.mobileno;
    order.address = body.data.address;
    order.pincode = body.data.pincode;
    order.quantity = body.data.quantity;
    order.price = body.data.price;
    order.shipping = body.data.shipping;
    order.total = body.data.total;
    order.status = "pending";
    order.imagepath = body.data.imagepath;
    order.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));

    });
});

router.post("/list", async (req, res) => {
    let orders = await Order.find();
    res.json({ data: orders });

});

router.post("/delete", async (req, res) => {
    let body = req.body;
    let order = await Order.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));

});

router.post("/get", async (req, res) => {
    let body = req.body
    let order = await Order.findById(body.data.id);
    res.json({ data: order });

});

router.post("/changestatus", async (req, res) => {
    let body = req.body;
    console.log(body);
    let order = Order();
    order = await Order.findById(body.data.id);
    order.status = body.data.status;
    let data = { data: { status: "success" } };
    // if (admin.length != 0)
    // data = { data: { status: "success" } };

    order.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

    res.json({ data: order });

});


router.post("/paymentstatus", async (req, res) => {
    let body = req.body;
    let order = Order();
    order = await Order.findById(body.data.id);
    order.status = "paid";
    order.save().then(result => {

        // Sending Email to Admin and User 
        let body = getadminmail(order);
        sendmail("suryakanttaral24@gmail.com", "order received", body);
        body = getusermail(order);
        sendmail(order.email, "Hello" + order.name + ", Your Order Received");


        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

    res.json({ data: order });

});

function getadminmail(order) {
    var body = "Hello Admin, Order Received ";
    return body
}

function getusermail(order) {
    var body = "Hello User, Order Received ";
    return body
}


function sendmail(to , subject, body){

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suryakanttaral24@gmail.com',
    pass: 'Taral@2410'
  }
});

var mailOptions = {
  from: 'suryakanttaral24@gmail.com',
  to: to,
  subject: subject,
  text: body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
module.exports = router;