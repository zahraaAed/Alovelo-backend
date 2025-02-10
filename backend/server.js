import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import homeRoute from "../Routes/homeRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Use the routes
app.use("/api/home", homeRoute);



// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

console.log("MongoDB URI:", process.env.MONGO_URI);
app.use((req, res, next) => {
    console.log(req.path, req.method);   
    next();
   });  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });