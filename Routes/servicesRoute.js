import express from "express";
import Services from "../Models/servicesModel.js";

const router = express.Router();

/** ✅ Route 1: Add Services Data (POST) */
router.post("/add-services", async (req, res) => {
  try {
    const newServices = new Services(req.body);
    await newServices.save();
    res.status(201).json({ message: "Services data added successfully!", newServices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** ✅ Route 2: Get Services Data (GET) */
router.get("/services", async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
