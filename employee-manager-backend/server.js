const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');
const http = require("http");
require('dotenv').config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost"
];

const app = express();
const server = http.createServer(app);

// ✅ Apply global CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(compression());

app.use(express.json());
app.use("/uploads", express.static("uploads"));



// Import routes
// const authRoutes = require('./routes/authRoutes');


// Routes
// app.use('/api/auth', authRoutes);


// Error Middleware
app.use(require('./middlewares/errorMiddleware'));

const PORT = process.env.PORT || 5000;

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection failed:', err.message));
