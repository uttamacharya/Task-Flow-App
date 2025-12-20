// const Section = require('../models/Section');

const createSection = async (req, res) => {
  try {
    const { name, color, customName } = req.body;
    const userId = req.user.id; // JWT middleware se aayega

    const newSection = new Section({ userId, name, color, customName });
    await newSection.save();

    res.status(201).json({
      success: true,
      message: 'Section created successfully',
      section: newSection
    });
  } catch (err) {
    // console.error("CreateSection Error:", err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const getSections = async (req, res) => {
  try {
    const userId = req.user.id;
    const sections = await Section.find({ userId });
    res.status(200).json({ success: true, sections });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const section = await Section.findByIdAndUpdate(id, updates, { new: true });
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    res.status(200).json({ success: true, message: 'Section updated', section });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Delete Section
const deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, message: 'Section deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// module.exports = { createSection, getSections, updateSection, deleteSection };
