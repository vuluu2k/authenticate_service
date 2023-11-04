import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: Number, default: 0, required: true },
    last_name: { type: String },
    first_name: { type: String },
    phone_number: { type: String, maxLength: 10 },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
