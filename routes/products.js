import express from 'express';
import Products from '../models/Products.js';

const router = express.Router();

// Post Product-----------------------------

router.post('/', async (req, res, next) => {
  const newProduct = new Products(req.body);
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
});

// Find Featured Products-------------------

router.get('/featured', async (req, res, next) => {
  const filter = { product_type: { $in: ['Featured'] } };
  try {
    const products = await Products.find(filter);
    console.log(products);
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
    console.log(products);
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
    console.log(products);
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
    console.log(products);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Find All Product-----------------------------

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
