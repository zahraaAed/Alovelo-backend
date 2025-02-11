const ContentServices=require("../Models/servicesModel");

/** ✅ Route 1: Add Services Data (POST) */
const addServices = async (req, res) => {
    try {
        console.log("Request received at /api/about/service");
        
        // Validate required fields
        if (!req.body.heroTitle || !req.body.description) {
            return res.status(400).json({
                error: "Hero title and description are required"
            });
        }

        // Handle files
        const heroImage = req.files.main_image?.[0];
        const servicesIcons = req.files.features_icon || [];
        
        // Generate paths
        const heroImagePath = heroImage ? `/images/${heroImage.filename}` : null;
        const servicesIconPaths = servicesIcons.map(file => `/images/${file.filename}`);

        // Prepare services list with icons
        const servicesList = req.body.servicesList.map((service, index) => ({
            ...service,
            icon: servicesIconPaths[index] || null
        }));

        // Create document with all fields
        const newServices = new ContentServices({
            heroTitle: req.body.heroTitle,
            description: req.body.description,
            heroImage: heroImagePath,
            servicesList
        });

        // Check if updating existing content
        const existingContent = await ContentServices.findOne();
        if (existingContent) {
            const updatedContent = await ContentServices.findByIdAndUpdate(
                existingContent._id,
                newServices,
                { new: true }
            );
            return res.status(200).json({
                message: "Content updated successfully!",
                updatedContent
            });
        }

        await newServices.save();
        res.status(201).json({
            message: "Services data added successfully!",
            newServices
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(error.code === 11000 ? 400 : 500).json({
            error: error.message || "An unexpected error occurred"
        });
    }
};


/** ✅ Route 2: Get Services Data (GET) */
const getServices= async (req, res) => {
  try {
    const services = await ContentServices.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={getServices, addServices};