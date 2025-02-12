const mongoose=require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
    },
    heroImage: {
      type: String, // URL for the hero section image
    },
    description: {
      type: String,
      required: true, // Main service description
    },
    servicesList: [
      {
        title: {
          type: String,
          required: true, // title of the service
        },
        description: {
          type: String,
          required: true, // Description of the service
        },
        icon: {
          type: String, // URL or icon class (optional)
        }
      }
    ],  
  },
  { timestamps: true }
);

const ContentServices = mongoose.model("ContentServices", servicesSchema);
module.exports = ContentServices;