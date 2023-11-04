import express from 'express';
import router from './src/routers';
import connectDB from './src/configs/database';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

router(app);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
});
