import mongoose from 'mongoose';
import express from 'express';
const ProductSchema = new mongoose.Schema(
  {
    title: String,
    short_description: String,
    long_description: String,
    regular_price: String,
    sell_price: String,
    sku: String,
    p_size: [String],
    p_color: [String],
    category: [String],
    sub_category: [String],
    product_type: [String],
    image: [],
    total_stocks: Number,
    product_rating: Array,
  },
  { timestamps: true }
);

export default mongoose.model('Products', ProductSchema);
