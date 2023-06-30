// controllers/thoughtController.js

const Thought = require('../models/Thought');
const User = require('../models/User');

// GET all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    console.error('Error retrieving thoughts:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET a single thought by its _id
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (error) {
    console.error('Error retrieving thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, username } = req.body;

    // Create the thought
    const thought = await Thought.create({ thoughtText, username });

    // Push the created thought's _id to the associated user's thoughts array
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT to update a thought by its _id
const updateThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );

    res.json(updatedThought);
  } catch (error) {
    console.error('Error updating thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE to remove a thought by its _id
const deleteThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    res.json(deletedThought);
  } catch (error) {
    console.error('Error deleting thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST to create a reaction stored in a single thought's reactions array field
const createReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (error) {
    console.error('Error creating reaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE to pull and remove a reaction by the reaction's reactionId value
const removeReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (error) {
    console.error('Error removing reaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  removeReaction,
};
