const express=require("express");
const {getServices, addServices}=require("../Controllers/servicesController");
const upload= require("../Middleware/multer");
const router=express.Router();

router.post("/add", upload.fields([
    { name: 'hero_image', maxCount: 1 },
    { name: 'services_icon', maxCount: 4 }
]), addServices);

router.get("/get", getServices);

module.exports=router;