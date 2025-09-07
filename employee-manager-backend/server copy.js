const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();

const allowedOrigins = [
  "https://www.juniagh.com",
  "https://junia.vercel.app",
  "http://localhost:5173",
  "capacitor://localhost",
  "http://localhost",
  "https://localhost"
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

// Socket.IO setup with matching CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  },
});

// WebSocket Events
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("newOrder", (order) => {
    console.log("New Order Received:", order);
    io.emit("orderNotification", order);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require('./routes/productRoutes.js');
const productTagRoutes = require('./routes/ProductTagRoute.js');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const salesAnalyticsRoutes = require('./routes/salesAnalyticsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const productCategoryRoute = require("./routes/productCategoryRoute");
const latestOrderRoute = require("./routes/latestOrderRoute");
const newOrderRoute = require("./routes/newOrderRoute.js");
const codOrderRoute = require("./routes/CodOrderRoute.js");
const codSuperAdmin = require("./routes/CodSuperAdmin.js");
const orderHistoryRoute = require("./routes/orderHistoryRoute");
const checkOutRoute = require("./routes/checkOutRoute");
const bankRoutes = require("./routes/bankRoutes");
const contactRoutes = require("./routes/contact");
const gifTagRoutes = require("./routes/gifTagRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productTags', productTagRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/new_orders', newOrderRoute);
app.use('/api/cod', codOrderRoute);
app.use('/api/cod/super', codSuperAdmin);
app.use('/api/users', userRoutes);
app.use('/api/salesAnalytics', salesAnalyticsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/productCategories", productCategoryRoute);
app.use("/api/latestOrder", latestOrderRoute);
app.use("/api/orderHistory", orderHistoryRoute);
app.use("/api/checkOutRoute", checkOutRoute);
app.use("/api/banks", bankRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gif-tags", gifTagRoutes);
app.use("/api/banners", bannerRoutes);

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
