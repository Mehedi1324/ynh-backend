import express from 'express';
import Orders from '../models/Orders';

const router = express.Router();

// Post Order -----------------------------

router.post('/', async (req, res, next) => {
  const newOrder = new Orders(req.body);
  console.log(newOrder);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
});

// Get All Orders-----------------------------

router.get('/all', async (req, res, next) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

export default router;
