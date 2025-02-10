const aboutContent = require("../Models/aboutModel");

const addAboutContent = async (req, res) => {
  try {
    console.log("Request received at /api/about/add");
    console.log('Request Body:', req.body);  // Check the form data
    console.log('Uploaded Files:', req.files);  // Check uploaded files

    const {
      hero_title,
      hero_subtitle,
      hero_content,
      vision_title,
      vision_content,
      mission_title,
      mission_content,
      features_title // Assuming features_title is now directly an array
    } = req.body;

    if (!hero_title || !hero_content || !vision_title || !vision_content || !mission_title || !mission_content) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Save image paths if files are uploaded
    const hero_image = req.files["hero_image"] ? `/images/${req.files["hero_image"][0].filename}` : null;
    const main_image = req.files["main_image"] ? `/images/${req.files["main_image"][0].filename}` : null;

    const features_icon = req.files["features_icon"]
      ? req.files["features_icon"].map(file => `/images/${file.filename}`)
      : [];

    // Directly use the features_title array
    const parsed_features_title = features_title ? features_title : [];

    const aboutData = {
      hero_title,
      hero_subtitle,
      hero_content,
      hero_image,
      vision_title,
      vision_content,
      mission_title,
      mission_content,
      main_image,
      features_icon,
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
