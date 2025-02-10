const express = require("express");
const { addAboutContent, getAboutContent } = require("../Controllers/aboutController");
const uploadContentImages = require("../Middleware/multer");
const router = express.Router();

// POST route to add About content with image uploads
router.post("/add", uploadContentImages, addAboutContent);

// GET route to fetch About content
router.get("/get", getAboutContent);

module.exports = router;
