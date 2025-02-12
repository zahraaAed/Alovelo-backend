const ContentServices = require("../Models/servicesModel");

/** ✅ Route 1: Add Services Data (POST) */
const addServices = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // ✅ Debugging request data

        // ✅ Ensure required fields exist
        if (!req.body.heroTitle || !req.body.description || !req.body.servicesList) {
            return res.status(400).json({
                error: "Hero title, description, and servicesList are required"
            });
        }

        // Handle images
        const heroImageFile = req.files?.hero_image?.[0];
        const servicesIcons = req.files?.services_icon || [];

        // Generate image paths
        const heroImagePath = heroImageFile ? `/images/${heroImageFile.filename}` : null;
        const servicesIconPaths = servicesIcons.map(file => `/images/${file.filename}`);

        // ✅ Parse servicesList safely
        let servicesList;
        if (typeof req.body.servicesList === "string") {
            try {
                servicesList = JSON.parse(req.body.servicesList);
            } catch (error) {
                return res.status(400).json({ error: "Invalid JSON format for servicesList" });
            }
        } else {
            servicesList = req.body.servicesList;
        }

        // ✅ Ensure servicesList is an array
        if (!Array.isArray(servicesList)) {
            return res.status(400).json({ error: "servicesList must be an array" });
        }

        // Attach icons to services
        servicesList = servicesList.map((service, index) => ({
            title: service.title,
            description: service.description,
            icon: servicesIconPaths[index] || null
        }));

        // Create new service data
        const newServices = new ContentServices({
            heroTitle: req.body.heroTitle,
            description: req.body.description,
            heroImage: heroImagePath,
            servicesList
        });

        await newServices.save();
        res.status(201).json({
            message: "Services data added successfully!",
            newServices
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({
            error: error.message || "An unexpected error occurred"
        });
    }
};

/** ✅ Route 2: Get Services Data (GET) */
const getServices = async (req, res) => {
  try {
    const services = await ContentServices.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getServices, addServices };
