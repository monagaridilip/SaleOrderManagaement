const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pincode: { type: String, default: '' }, // Assuming default value is an empty string
    location_name: { type: String },
    type: { type: String, enum: ['Individual', 'Corporate'] }, // Assuming 'type' should be one of these values
    profile_pic: { type: String, default: null },
    gst: { type: String, default: '' },
  }, { timestamps: true });


const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer