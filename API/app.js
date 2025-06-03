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

const allowedOrigins = ['https://toyshop.sbs', 'https://admin.toyshop.sbs'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // <-- FIXED: return origin, not true
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// Ensure CORS is the first middleware
// app.use(cors(corsOptions));

// Error handling for CORS errors
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      msg: 'Not allowed by CORS',
      status: 403
    });
  } else {
    res.status(err.status || 500).json({
      msg: err.msg || err.message,
      status: err.status || 500,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

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
