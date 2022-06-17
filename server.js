const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")
const dotenv = require("dotenv")


dotenv.config()
const app = express()
app.use(bodyParser.json())

console.log(":::"+process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
    /*useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true*/
})
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

app.post("/api/products2", async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

//const port = process.nextTick.PORT || 5000
const port = process.env.PORT || 5000
app.listen(port, () => console.log("serve at https://localhost:5000"))