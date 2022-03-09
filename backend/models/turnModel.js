import mongoose from 'mongoose';

const turnSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    hour: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  },
  {
    timestamps: true,
  }
);
const Turn = mongoose.model('Turn', turnSchema);
export default Turn;
