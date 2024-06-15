const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const Product = require('./models/product.model');
const {SaleOrder,Counter} = require('./models/saleOrder.model');
const Customer = require('./models/customers.model');
const SKU = require('./models/sku.model');


const app = express();
const PORT = 5000;

const connectMongoDb = () =>{
    mongoose.connect("mongodb+srv://monagaridilip07:monagaridilip@cluster0.4krcnnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Connected to mongoDB")
    }).catch((err)=>{
        console.log(err)
    })
}
connectMongoDb();

app.use(cors());
app.use(express.json());

app.get('/api/products',async(req,res)=>{
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        console.log(error)
    }
})
app.get('/api/customers',async(req,res)=>{
    try {
        const customers = await Customer.find();
        res.json(customers)
    } catch (error) {
        console.log(error)
    }
})
app.get('/api/saleorders', async (req, res) => {
    try {
      const saleOrders = await SaleOrder.find().populate('customer_id', 'name');
      res.json(saleOrders);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });
app.get('/api/skuItems',async(req,res)=>{
    try {
        const SkuItems = await SKU.find();
        res.json(SkuItems)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})
app.post('/api/cSaleorders', async (req, res) => {
    try {
      const { customer_id, invoice_no, invoice_date, paid, items } = req.body;
  
      const saleOrderData = {
        customer_id: new mongoose.Types.ObjectId(customer_id),
        invoice_no,
        invoice_date: invoice_date ? new Date(invoice_date) : undefined,
        paid,
        items: items.map(item => ({
          product_id: new mongoose.Types.ObjectId(item.product_id),
          skus: item.skus.map(sku => ({
            sku_id: sku.sku_id,
            price: sku.price,
            quantity: sku.quantity
          }))
        }))
      };
  
      const saleOrder = new SaleOrder(saleOrderData);
      const savedOrder = await saleOrder.save();
  
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/vsaleorders/:id', async (req, res) => {
    try {
      const saleOrder = await SaleOrder.findById(req.params.id)
        .populate('customer_id', 'name') // Adjust the field to populate customer details
        .populate('items.product_id', 'name') // Adjust the field to populate product details
        .exec();
  
      if (!saleOrder) {
        return res.status(404).json({ message: 'Sale order not found' });
      }
  
      // Fetch the current counter value
      const counter = await Counter.findById('saleOrderId');
  
      res.status(200).json({ saleOrder, currentCounter: counter ? counter.seq : null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put('/api/edit-SaleOrder/:id', async (req, res) => {
    try {
        // Find the sale order by ID and update it with the request body data
        const updateSaleOrder = await SaleOrder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Options: new returns the updated document, runValidators ensures that validation is run
        );

        // If the sale order is not found, return a 404 status with a message
        if (!updateSaleOrder) {
            return res.status(404).json({ message: 'Sale order not found' });
        }

        // Return the updated sale order with a 200 status
        res.status(200).json(updateSaleOrder);
    } catch (error) {
        // Handle any errors and return a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})