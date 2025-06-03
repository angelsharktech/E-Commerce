import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import categoryRoute from './routes/category.js'
import webuserRoute from './routes/webuser.js'
import cartRoute from './routes/cart.js'

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://toyshop.sbs', 'https://another-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/test", (req, res, next) => {
  res.send("<h1>Welcome To Nodejs</h1>");
});

app.use("/api/gallery/",express.static("gallery"))
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/category', categoryRoute)

app.use('/api/webuser', webuserRoute)
app.use('/api/cart', cartRoute)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.msg,
    status: err.status,
    stack: err.stack,
  });
});

const conncetDB = () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("Connecting Database...");
  } catch (error) {
    console.log("error", error);
  }
};
mongoose.connection.on("connected", () => {
  console.log("Database Connected Successful...");
});
mongoose.connection.on("disconnected", () => {
  console.log("database not connected...");
});
mongoose.set("strictQuery", true);
app.listen(port, () => {
  conncetDB();
  console.log(`Listening to ${port}`);
});
