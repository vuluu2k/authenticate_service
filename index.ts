import express from 'express';
import router from './src/routers';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
