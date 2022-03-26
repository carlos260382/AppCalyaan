import mongoose from 'mongoose';

const turnSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    hour: { type: String, required: true, },
    status:{ type: Boolean, default: false, },
    orderId:{ type: mongoose.Schema.Types.ObjectID, ref: 'Order' }, 
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    service: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    lat: Number,
    lng: Number,
  },
  {
    timestamps: true,
  }
);
const Turn = mongoose.model('Turn', turnSchema);
export default Turn;
