import express from 'express';
import Products from '../models/Products.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Cloudinary Config----------------------------

cloudinary.config({
  cloud_name: 'dx30ulg0o',
  api_key: '271179376229133',
  api_secret: 'AlpF9xejPJQNoH7ftKKOmWDhcFI',
});

// post product-----------------

router.post('/upload', async (req, res) => {
  try {
    const {
      title,
      short_description,
      long_description,
      regular_price,
      sell_price,
      sku,
      p_size,
      p_color,
      category,
      sub_category,
      product_type,
      image,
      total_stocks,
      product_rating,
    } = req.body;

    // Check if image is an array
    const imageArray = Array.from(image);

    const uploadedImages = [];
    // Loop through each image in the array
    for (const file of imageArray) {
      console.log(file);
      const result = await cloudinary.uploader.upload(file.path);
      console.log(result);
      const imageUrl = result.secure_url;
      uploadedImages.push(imageUrl);
    }

    // Create a new product object with the details and uploaded image URLs
    const newProduct = new Products({
      title,
      short_description,
      long_description,
      regular_price,
      sell_price,
      sku,
      p_size,
      p_color,
      category,
      sub_category,
      product_type,
      image: uploadedImages,
      total_stocks,
      product_rating,
    });

    // Save the new product to MongoDB
    const savedProduct = await newProduct.save();

    return res.status(200).json(savedProduct);
  } catch (error) {
    console.error('Error uploading product to Cloudinary:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Find Featured Products-------------------

router.get('/featured', async (req, res, next) => {
  const filter = { product_type: { $in: ['Featured'] } };
  try {
    const products = await Products.find(filter);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
// Find New Collection-------------------

router.get('/new-collection', async (req, res, next) => {
  const filter = { product_type: { $in: ['New Collections'] } };
  try {
    const products = await Products.find(filter);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
// Find Trending Products-------------------

router.get('/trending', async (req, res, next) => {
  const filter = { product_type: { $in: ['Trending'] } };
  try {
    const products = await Products.find(filter);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
// Find Weekly Best Products-------------------

router.get('/weekly-best', async (req, res, next) => {
  const filter = { product_type: { $in: ['Weekly Best'] } };
  try {
    const products = await Products.find(filter);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Find All Orders-----------------------------

router.get('/all', async (req, res, next) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Update Product-----------------------------

router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
});

// Delete Product-----------------------------

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json('Successfully deleted');
  } catch (err) {
    next(err);
  }
});

// Get Product By Id -----------------------------

router.get('/search/:id', async (req, res, next) => {
  try {
    const searched_product = await Products.findById(req.params.id);
    res.status(200).json(searched_product);
  } catch (err) {
    next(err);
  }
});

// Post Product-----------------------------

// Post Product-----------------------------

export default router;
