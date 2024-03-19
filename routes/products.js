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

router.post('/upload', async (req, res, next) => {
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
      total_stocks,
      product_rating,
    } = req.body;

    const files = req.files; // Assuming files are directly available in req.files
    console.log(files);

    if (!files || !files.image) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedImages = [];

    // If only one file is uploaded, it's not an array
    if (!Array.isArray(files.image)) {
      files.image = [files.image];
    }

    for (const file of files.image) {
      // Convert Buffer data to base64-encoded string
      const base64Data = file.data.toString('base64');

      // Upload base64-encoded string to Cloudinary
      const result = await cloudinary.uploader.upload(
        'data:image/jpeg;base64,' + base64Data,
        {
          resource_type: 'image',
        }
      );

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
    console.log(savedProduct);

    return res.status(200).json(savedProduct);
  } catch (error) {
    console.error('Error uploading product to Cloudinary:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

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
