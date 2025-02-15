const aboutContent = require("../Models/aboutModel");

const addAboutContent = async (req, res) => {
  try {
    console.log("Request received at /api/about/add");


        // Check if only features need updating
        const isFeatureUpdate = req.body.features_title && req.files?.features_icon;
        const existingContent = await aboutContent.findOne();
    
        if (isFeatureUpdate && existingContent) {
          console.log("Updating only features array...");
    
          // Process feature titles
          const featureTitles = Array.isArray(req.body.features_title)
            ? req.body.features_title
            : [req.body.features_title];
    
          // Process feature icons
          const featuresIcons = req.files?.features_icon || [];
    
          // Create updated features array
          const features = featuresIcons.map((file, index) => ({
            icon: `/images/${file.filename}`,
            title: featureTitles[index] || `Feature ${index + 1}`
          }));
    
          // Update only the `features` field
          const updatedContent = await aboutContent.findByIdAndUpdate(
            existingContent._id,
            { $set: { features } },  // ✅ Updating only features
            { new: true }
          );
    
          return res.status(200).json({
            message: "Features updated successfully!",
            updatedContent
          });
        }
    
        // Process other fields if full update
        console.log("Updating full about content...");
    // Extract text fields from request body
    const {
      hero_title,
      hero_content,
      vision_title,
      vision_content,
      mission_title,
      mission_content,
      features_title // Expecting array of feature titles
    } = req.body;

    // Ensure features_title is an array
    const parsed_features_title = Array.isArray(features_title) ? features_title
    : features_title
    ? [features_title] 
    : [];

    // Access image files
    const heroImageFile = req.files?.hero_image?.[0];
    const mainImageFile = req.files?.main_image?.[0];
    //const featuresIcons = req.files?.features_icon || [];

    // Generate paths for images
    const heroImagePath = heroImageFile ? `/images/${heroImageFile.filename}` : null;
    const mainImagePath = mainImageFile ? `/images/${mainImageFile.filename}` : null;

    // Ensure featuresIcons and features_title arrays have the same length
    // const features = featuresIcons.map((file, index) => ({
    //   icon: `/images/${file.filename}`,
    //   title: parsed_features_title[index] || "Feature ${index + 1}" // Prevent undefined values
    // }));

    // Construct About Data object
    const aboutData = {
      hero_title,
      hero_content,
      hero_image: heroImagePath,
      vision_title,
      vision_content,
      mission_title,
      mission_content,
      main_image: mainImagePath,
      features
    };

    // Check if content exists - Update if exists, else create new
    //const existingContent = await aboutContent.findOne();
    if (existingContent) {
      const updatedContent = await aboutContent.findByIdAndUpdate(
        existingContent._id,
        aboutData,
        { new: true }
      );
      return res.status(200).json({ message: "Updated successfully!", updatedContent });
    }

    // Save new about content
    const newContent = new aboutContent(aboutData);
    await newContent.save();
    res.status(201).json({ message: "Saved successfully!", newContent });

  } catch (error) {
    console.error('Error occurred:', error);
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
