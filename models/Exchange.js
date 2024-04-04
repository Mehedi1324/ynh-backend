import mongoose, { mongo } from 'mongoose';

const ExchangeSchema = new mongoose.Schema({
  orderId: String,
  userDetails: [
    {
      type: mongoose.Types.userId,
      ref: 'Users',
    },
  ],
  productId: [{
    type:mongoose.Types.ObjectId;
    ref:"Products"
  }],
  reason: String,
  explain: String,
  productImg: File,
  returnProduct: Array,
});

export default mongoose.model('Exchange', ExchangeSchema);
