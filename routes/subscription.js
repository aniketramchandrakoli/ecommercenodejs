var express = require("express");
var bodyparser = require("body-parser");
var jsonparser = bodyparser.json();
const router = express.Router();

const Subscription = require("../models/Subscription");

router.post("/save", async(req,res)=>{
    let body = req.body;
    let sub = Subscription();
    // sub = await Subscription.findById(body.data.id);
    sub.email = body.data.email;

    sub.save().then(result=>{
        res.end(JSON.stringify(result));
    },
    err=>{
        res.end(JSON.stringify(err));
    })
})

router.post("/list", async(req,res)=>{
    let body = req.body;
    let sub = Subscription();
    sub = await Subscription.find();
    

    sub.save().then(result=>{
        res.end(JSON.stringify(result));
    },
    err=>{
        res.end(JSON.stringify(err));
    })
})


module.exports = router;