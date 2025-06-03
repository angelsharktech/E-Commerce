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

// Configure CORS settings
const corsOptions = {
  origin: function(origin, callback) {
    // Check if origin is in allowed list
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
    
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow the request
      callback(null, true);
    } else {
      // Log the blocked origin
      console.log(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Apply CORS to all routes
app.use(cors(corsOptions));

// Add CORS headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && corsOptions.origin) {
    corsOptions.origin(origin, (err, allowed) => {
      if (allowed) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
      }
    });
  }
  next();
});
  

// Handle pre-flight requests
app.options('*', cors());

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    path: req.path,
    origin: req.headers.origin,
    method: req.method
  });

  if (err.message === 'Not allowed by CORS') {
    // Handle CORS errors
    res.status(403).json({
      success: false,
      msg: 'CORS Error: This origin is not allowed to access this resource',
      status: 403
    });
  } else {
    // Handle other errors
    next(err);
  }
});

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
