const HomeContent = require("../Models/homeModel");

const addHomeContent = async (req, res) => {
    try {
        console.log("Request received at /api/home/add");

        // Validate required image fields
        const requiredImageFields = ['imageHome', 'imageSection'];
        const missingImageFields = requiredImageFields.filter(field =>
            !req.files[field]?.[0]
        );

        if (missingImageFields.length > 0) {
            return res.status(400).json({
                error: "Missing required images",
                missingFields: missingImageFields
            });
        }

        // Generate paths for uploaded images
        const imageHomePath = `/images/${req.files.imageHome[0].filename}`;
        const imageSectionPath = `/images/${req.files.imageSection[0].filename}`;

        // Handle gallery images if provided
        const galleryImages = req.files.galleryImages?.map(file => `/images/${file.filename}`) || [];

        // Prepare content object (excluding `_id`)
        const contentData = {
            imageHome: imageHomePath,
            subtitlehomeHeader: req.body.subtitlehomeHeader,
            contenthomeHeader: req.body.contenthomeHeader,
            ctabtnhomeHeader: req.body.ctabtnhomeHeader,
            imageSection: imageSectionPath,
            titleSection: req.body.titleSection,
            contentSection: req.body.contentSection,
            titlePromotionalSection: req.body.titlePromotionalSection,
            ctabtnPromotionalSection: req.body.ctabtnPromotionalSection,
            galleryImages
        };

        // Check if existing content exists (only one document should exist)
        const existingContent = await HomeContent.findOne();
        
        if (existingContent) {
            // ✅ Fix: Use `$set` to update fields without modifying `_id`
            const updatedContent = await HomeContent.findByIdAndUpdate(
                existingContent._id,
                { $set: contentData }, // ✅ This prevents the `_id` modification error
                { new: true } // Return the updated document
            );

            return res.status(200).json({
                message: "Content updated successfully!",
                updatedContent
            });
        }

        // If no existing content, create a new document
        const newContent = new HomeContent(contentData);
        await newContent.save();

        res.status(201).json({
            message: "Content added successfully!",
            newContent
        });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(error.code === 11000 ? 400 : 500).json({
            error: error.message || "An unexpected error occurred"
        });
    }
};

// ✅ GET Route: Retrieve Home Content
const getHomeContent = async (req, res) => {
    try {
        const content = await HomeContent.find();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addHomeContent, getHomeContent };
