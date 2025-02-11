require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const homeRoute = require("./Routes/homeRoute");
const aboutRoute =require("./Routes/aboutRoute");
const servicesRoute=require("./Routes/servicesRoute");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use("/images", express.static("images"));
app.use("/api/home", homeRoute);
app.use("/api/about", aboutRoute);
app.use("/api/services", servicesRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
