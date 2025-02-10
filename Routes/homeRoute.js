const express = require("express");
const { addHomeContent, getHomeContent } = require("../Controllers/homeController");

const router = express.Router();


router.post("/add-homecontent", addHomeContent);
router.get("/homecontent", getHomeContent);

module.exports = router;
