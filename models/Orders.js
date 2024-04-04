import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company_name: String,
  country: String,
  street_address: String,
  delivery_time: String,
  ordered_prducts: [{ type: mongoose.Types.ObjectId, ref: 'Products' }],
  orderId: String,
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
    },
  ],
});
export default mongoose.model('Orders', OrdersSchema);
