import express from "express";
import router from "./src/routers";
import connectDB from "./src/configs/database";
import cors from "cors";
const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

router(app);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on Port http://localhost:${port}`);
  });
});
