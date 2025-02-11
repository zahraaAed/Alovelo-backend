const express = require("express");
const { addHomeContent, getHomeContent } = require("../Controllers/homeController");
const upload= require("../Middleware/multer");
const router = express.Router();


router.post("/add", upload.fields([
    { name: 'imageHome', maxCount: 1 },
    { name: 'imageSection', maxCount: 1 },
    { name: 'galleryImages', maxCount: 20 },
    { name: 'promotionalImages', maxCount: 5 }
]), addHomeContent);
router.get("/homecontent", getHomeContent);

module.exports = router;
