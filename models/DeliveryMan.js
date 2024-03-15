import mongoose from 'mongoose';

const DeliverManSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  deliveryStatus: Array,
});

export default mongoose.model('DeliveryMan', DeliverManSchema);
