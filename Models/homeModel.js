import mongoose from "mongoose";
import { model } from "mongoose";
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
    titlePromotionalSection:{
        type: String,
    },
    ctabtnPromotionalSection:{
        type: String,
    },
    galleryImages: {
        type: [String], // Array of URLs for the gallery images.
      },  
  },
  { timestamps: true }
);

const ContentHome = mongoose.model("ContentHome", contentSchema);

export default ContentHome;