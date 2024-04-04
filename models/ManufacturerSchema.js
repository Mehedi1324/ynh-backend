import express from 'express';
import mongoose from 'mongoose';

const ManufacturerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  designation: String,
  mobile_number: String,
  whats_app: String,
  company_name: String,
  about_company: String,
  role: {
    type: String,
    default: 'manufacturer',
  },
  shareholder: String,
  tin: String,
  file: String,
  products: [{ type: mongoose.Types.ObjectId, ref: 'Products' }],
  product_quantity: Number,
});

export default mongoose.model('Manufacturer', ManufacturerSchema);
