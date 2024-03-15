import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company_name: String,
  country: String,
  street_address: String,
  delivery_time: String,
  ordered_prducts: Array,
  orderId: String,
  user: Array,
});
export default mongoose.model('Orders', OrdersSchema);
