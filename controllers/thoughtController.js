const Thought = require('../models/Thought');

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thoughts' });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create thought' });
  }
};

// Update a thought
const updateThought = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({ error: 'Thought not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update thought' });
  }
};

// Delete a thought
const deleteThought = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedThought = await Thought.findByIdAndDelete(id);
    if (deletedThought) {
      res.json(deletedThought);
    } else {
      res.status(404).json({ error: 'Thought not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete thought' });
  }
};

module.exports = {
  getAllThoughts,
  createThought,
  updateThought,
  deleteThought,
};
