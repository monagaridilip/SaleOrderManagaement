const mongoose = require('mongoose');

const saleOrderSchema = new mongoose.Schema({
  saleOrderId: { type: Number, unique: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  invoice_no: { type: String, required: true },
  invoice_date: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      skus: [
        {
          sku_id: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      ],
    },
  ],
});

// Counter Schema embedded within SaleOrder
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 },
});

const Counter = mongoose.model('Counter', counterSchema);

saleOrderSchema.pre('save', async function (next) {
  const saleOrder = this;
  if (!saleOrder.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'saleOrderId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    saleOrder.saleOrderId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

saleOrderSchema.pre('find', function (next) {
  this.populate('customer_id', 'name'); // Populate customer_id with name field from Customer model
  next();
});

const SaleOrder = mongoose.model('SaleOrder', saleOrderSchema);

module.exports = { SaleOrder, Counter };
