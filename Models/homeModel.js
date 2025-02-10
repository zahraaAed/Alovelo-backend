const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  { 
    imageHome: {
      type: String,
      required: true,
    },
    subtitlehomeHeader: {
      type: String,
      required: true,
    },
    contenthomeHeader: {
      type: String,
      required: true,
    },
    ctabtnhomeHeader: {
      type: String,
      required: true,
    },
    imageSection: {
      type: String,
      required: true,
    },
    titleSection: {
      type: String,
    },
    contentSection: {
      type: String,
    },
    titlePromotionalSection: {
      type: String,
    },
    ctabtnPromotionalSection: {
      type: String,
    },
    galleryImages: {
      type: [String], // Array of image URLs
    },  
  },
  { timestamps: true }
);

const homecontent = mongoose.model("ContentHome", contentSchema);

// ✅ Use CommonJS export
module.exports = homecontent;
