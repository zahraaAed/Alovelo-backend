const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  hero_title: { 
    type: String, 
    required: true 
  },
  hero_content: { 
    type: String, 
    required: true 
  },
  hero_image: { 
    type: String 
  },
  vision_title: { 
    type: String, 
    required: true 
  },
  vision_content: { 
    type: String, 
    required: true 
  },
  mission_title: { 
    type: String, 
    required: true 
  },
  mission_content: { 
    type: String, 
    required: true 
  },
  main_image: { 
    type: String 
  },
  features: [
    {
      icon: { 
        type: String, 
        required: true 
      },
      title: { 
        type: String, 
        required: true 
      }
    }
  ]
});

const aboutContent = mongoose.model("ContentAbout", AboutSchema);
module.exports = aboutContent;
