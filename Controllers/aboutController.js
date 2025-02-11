const aboutContent = require("../Models/aboutModel");

const addAboutContent = async (req, res) => {
  try {
    console.log("Request received at /api/about/add");
  
          // Access files by their field names
          const heroImageFile = req.files.hero_image?.[0];
          const mainImageFile = req.files.main_image?.[0];
          const featuresIcons = req.files.features_icon || [];
  
          // Create paths for database storage
          const heroImagePath = heroImageFile ? `/images/${heroImageFile.filename}` : null;
          const mainImagePath = mainImageFile ? `/images/${mainImageFile.filename}` : null;
          const featuresIconPaths = featuresIcons.map(file => `/images/${file.filename}`);
  
          // Rest of your existing logic...
          
          const aboutData = {
              hero_title,
              hero_content,
              hero_image: heroImagePath,
              vision_title,
              vision_content,
              mission_title,
              mission_content,
              main_image: mainImagePath,
              features_icon: featuresIconPaths,
              features_title: parsed_features_title
          };
  
   
    // Check if content exists and update or create new content
    const existingContent = await aboutContent.findOne();
    if (existingContent) {
      const updatedContent = await aboutContent.findOneAndUpdate({}, aboutData, { new: true });
      return res.status(200).json({ message: "Updated successfully!", updatedContent });
    }

    const newContent = new aboutContent(aboutData);
    await newContent.save();
    res.status(201).json({ message: "Saved successfully!", newContent });

  } catch (error) {
    console.error('Error occurred:', error);  // Log the full error
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};


const getAboutContent = async (req, res) => {
  try {
    const content = await aboutContent.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addAboutContent, getAboutContent };
