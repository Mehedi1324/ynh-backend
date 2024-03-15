import mongoose, { mongo } from 'mongoose';

const ExchangeSchema = new mongoose.Schema({
  orderId: String,
  userDetails: Array,
  reason: String,
  explain: String,
  productImg: File,
  returnProduct: Array,
});

export default mongoose.model('Exchange', ExchangeSchema);
