import express from 'express';
import router from './src/routers';
import connectDB from './src/configs/database';
import cookieParser from "cookie-parser";

const app = express();

app.set('port', (process.env.PORT || 3001));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

router(app);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on Port http://localhost:300');
    });
});
