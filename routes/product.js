var express = require("express");
var bodyparser = require("body-parser");
var jsonparser = bodyparser.json();
const router = express.Router();
var fs = require("fs");

const Product = require("../models/Product");
const { json } = require("express/lib/response");



router.post("/save", async (req, res) => {
    let body = req.body;
    let product = new Product();
    if (body.data.id != "") {
        product = await Product.findById(body.data.id);
    }
    product.name = body.data.name;
    product.description = body.data.description;
    product.sizes = body.data.sizes;
    product.colors = body.data.colors;
    product.mrp = body.data.mrp;
    product.price = body.data.price;
    product.instock = body.data.instock;
    product.status = body.data.status;
    product.sku = body.data.sku;
    product.imagepath = body.data.imagepath;

    if (body.data.imagecode != "") {
        let base64image = body.data.imagecode.replace(/^data:image\/jpeg;base64,/, "");
        base64image = base64image.replace(/^data:image\/png;base64,/, "");
        product.imagepath = "productpics/" + Math.random().toString(36).substring(2, 7) + ".png";
        fs.writeFile("assets/" + product.imagepath, base64image, 'base64', function (err) {
            console.log("Error image saving-" + err);
        });
    }
    product.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));

    });
});


router.post("/list", async (req, res) => {
    let product = await Product.find();
    res.json({ data: product });

});

router.post("/delete", async (req, res) => {
    let body = req.body;
    let product = await Product.findByIdAndDelete(body.data.id);

    let data = {
        "data": {
            "status": "success"
        }
    }

    res.end(JSON.stringify(data));

});

router.post("/get", async (req, res) => {
    let body = req.body
    let product = await Product.findById(body.data.id);
    res.json({ data: product });

});

router.post("/findnew", async (req, res) => {
    let body = req.body
    let product = await Product.find({"id":body.data.id});
    res.json({ data: product });

});

router.post("/updatestatus", async (req, res) => {
    let body = req.body;
    let product = Product();
    product = await Product.findById(body.data.id);
    product.status = body.data.status;

    product.save().then(result=>{
        res.end(JSON.stringify(result));
    },err=>{
        res.end(JSON.stringify(err));
    });

    res.json({ data: product });

});

router.post("/updatestock", async (req, res) => {
    let body = req.body;
    let product = Product();
    product = await Product.findById(body.data.id);
    product.instock = body.data.instock;

    product.save().then(result=>{
        res.end(JSON.stringify(result));
    },err=>{
        res.end(JSON.stringify(err));
    });

    res.json({ data: product });

});


module.exports = router;
