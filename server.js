const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")
const dotenv = require("dotenv")


dotenv.config()
const app = express()
app.use(bodyParser.json())

console.log("URI:::"+process.env.MONGODB_URI)
console.log("URL:::"+process.env.MONGODB_URL)

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/react-shopping", {})
    .then(() => console.log("connected to DB"))
    .catch((e) => console.log("error in connecting to DB\n"+e))

const Product = mongoose.model("products", new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

app.get("/api/products", async (req, res) => {
    const products =  await Product.find({})
    res.send(products)
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

const Order = mongoose.model("order", new mongoose.Schema(
    {
        _id: {type: String, default: shortid.generate},
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [{
            _id: String, 
            title: String,
            price: Number,
            count: Number
        }]
    },
    {
        timestamps: true,
    }
))

app.post("/api/orders", async(req, res) => {
    if(!req.body.name || 
       !req.body.email || 
       !req.body.address || 
       !req.body.total ||
       !req.body.cartItems) {
           return res.send({message: "Data is required."})
    }
    const newOrder = new Order(req.body)
    const order = await newOrder.save()
    res.send(order)
})

app.get("/api/orders", async(req, res) => {
    const orders = await Order.find({})
    res.send(orders)
})

app.delete("/api/orders/:id", async(req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.send(deletedOrder)
})

//const port = process.nextTick.PORT || 5000
const port = process.env.PORT || 5000
app.listen(port, () => console.log("serve at https://localhost:5000"))