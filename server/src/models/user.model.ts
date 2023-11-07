import mongoose from 'mongoose';
const { Schema } = mongoose;
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: Number, default: 0, required: true },
    last_name: { type: String },
    first_name: { type: String },
    phone_number: { type: String, maxLength: 10 },
    access_token: { type: String },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

userSchema.method('jwt', function (expireTime: number) {
  return jwt.sign({ _id: this._id, fullname: this.first_name + ' ' + this.last_name },
    process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30s" });
})

userSchema.method('rjwt', function (expireTime: number) {
  return jwt.sign({ _id: this._id, fullname: this.first_name + ' ' + this.last_name },
    process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "30s" });
})

userSchema.method('getInfo', function () {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    role: this.role,
    phone_number: this.phone_number,
    fullname: this.last_name + ' ' + this.last_name
  };
})

export default mongoose.model('User', userSchema);
