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
    access_token: { type: String, default: "" },
    refresh_token: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.method('jwt', function (account) {
  const user = account || { _id: this._id, email: this.email }

  const access_token: string = jwt.sign(user,
    process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: 24 * 60 * 60
  });

  const refresh_token: string = jwt.sign(user,
    process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: 30 * 24 * 60 * 60 });

  return { access_token, refresh_token }
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
