const HomeContent = require("../Models/homeModel");

const addHomeContent = async (req, res) => {
  try {
    const newContent = new HomeContent(req.body);
    await newContent.save();
    res.status(201).json({ message: "Content saved successfully!", newContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addHomeContent, getHomeContent };
