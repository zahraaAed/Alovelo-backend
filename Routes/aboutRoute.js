const express = require("express");
const { addAboutContent, getAboutContent } = require("../Controllers/aboutController");
const upload= require("../Middleware/multer");
const router = express.Router();

// POST route to add About content with image uploads

router.post("/add", upload.fields([
    { name: 'hero_image', maxCount: 1 },
    { name: 'main_image', maxCount: 1 },
    { name: 'features_icon', maxCount: 5 }
]), addAboutContent);


// GET route to fetch About content
router.get("/get", getAboutContent);

module.exports = router;
