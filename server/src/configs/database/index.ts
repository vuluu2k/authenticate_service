// getting-started.js
import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://dev040320:SpCThGd9YsCJX7TB@authenticated.15bhymr.mongodb.net/?retryWrites=true&w=majority'
    );

    console.log('connect db success');
  } catch (error) {
    console.log('connect db error', error);
  }
}

export default connectDB;
