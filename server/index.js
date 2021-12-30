const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_VnSs033Scyq7MW',
    key_secret: 'NFx79iO5P7uA0fC2tMItrHOJ',
});

var options = {
    amount: 0,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
};

app.get("/", (req, res) => {
    res.json({ "working": "true" });
})

app.post("/confirm", (req, res) => {
    console.log("-------payment confirm---------")
    console.log(req.body);
    res.json({ status: "ok" });
})

app.post("/payment", (req, res) => {
    let amount = req.body.amount;
    options.amount = amount * 100;
    //initiate payment
    instance.orders.create(options, function (err, order) {
        if (err) {
            res.json({ status: 'error', error: err });
        }
        else {
            console.log("-------payment initiated---------")
            console.log(order);
            res.json({ status: 'success', order: order });
        }
    });
})

app.listen(port, () => {
    console.log(port);
});
