
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
    characteristics: { type: String },
    features: { type: String },
    ownerId: { type: Number },
    adding_date: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
  },{timestamps:true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product