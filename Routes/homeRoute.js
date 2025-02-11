import express from "express";
import ContentHome from "../Models/homeModel.js"; 

const router = express.Router();

/** ✅ Route 1: Save Data (POST) */
router.post("/add-homecontent", async (req, res) => {
  try {
    const newContent = new ContentHome(req.body);
    await newContent.save();
    res.status(201).json({ message: "Content saved successfully!", newContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** ✅ Route 2: Get Data (GET) */
router.get("/homecontent", async (req, res) => {
  try {
    const content = await ContentHome.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
