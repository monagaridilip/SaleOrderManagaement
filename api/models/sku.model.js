const mongoose = require('mongoose');

const skuSchema = new mongoose.Schema({
  sku_id: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const SKU = mongoose.model('SKU', skuSchema);

module.exports = SKU;