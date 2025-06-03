import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import https from 'https';
import fs from 'fs';
dotenv.config();

import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import categoryRoute from './routes/category.js'
import webuserRoute from './routes/webuser.js'
import cartRoute from './routes/cart.js'

const app = express();
const port = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 443;

app.use(
    cors({
      credentials: true,
      origin: function(origin, callback) {
        if (!origin || process.env.ALLOWED_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err); // log full error
  res.status(err.status || 500).json({
    msg: err.message || 'Internal Server Error',
    status: err.status || 500,
    stack: err.stack,
  });
});

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

const connectDB = () => {
  try {
    mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: "majority",
      wtimeout: 2500,
      journal: true,
      writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 5000
      }
    });
    console.log("Connecting to Database...");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Database Connected Successfully...");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err);
  // Attempt to reconnect on error
  if (err.name === 'MongoNetworkError') {
    setTimeout(connectDB, 5000);
  }
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected. Attempting to reconnect...");
  setTimeout(connectDB, 5000);
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
});

mongoose.set("strictQuery", true);
app.listen(port, () => {
  conncetDB();
  console.log(`HTTP Server listening on port ${port}`);
});

// HTTPS Server (only if SSL cert exists)
try {
  const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
  const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server listening on port ${httpsPort}`);
  });
} catch (error) {
  console.log('SSL certificates not found, HTTPS server not started');
}
