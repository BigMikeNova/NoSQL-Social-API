const User = require('../models/User');
const Thought = require('../models/Thought');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET a single user by its _id and populated thought and friend data
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID)
      .populate('thoughts')
      .populate('friends');
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST a new user
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT to update a user by its _id
const updateUserById = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userID,
      { username, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE to remove user by its _id
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userID);

    // Remove the user's associated thoughts
    await Thought.deleteMany({ username: deletedUser.username });

    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST to add a new friend to a user's friend list
const addFriend = async (req, res) => {
  try {
    const { userID, friendID } = req.params;

    // Update the user's friend list by pushing the new friend's _id
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $push: { friends: friendID } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE to remove a friend from a user's friend list
const removeFriend = async (req, res) => {
  try {
    const { userID, friendID } = req.params;

    // Update the user's friend list by pulling the friend's _id
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $pull: { friends: friendID } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function for reacting to a thought
const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reaction } = req.body;

  try {
    // Find the thought by its ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Add the reaction to the thought's reactions array
    thought.reactions.push(reaction);

    // Save the updated thought to the database
    await thought.save();

    return res.status(200).json({ message: 'Reaction added successfully' });
  } catch (err) {
    console.error('Error adding reaction:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for deleting a reaction from a thought
const deleteReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionId } = req.body;

  try {
    // Find the thought by its ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Find the index of the reaction in the thought's reactions array
    const reactionIndex = thought.reactions.indexOf(reactionId);

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction from the thought's reactions array
    thought.reactions.splice(reactionIndex, 1);

    // Save the updated thought to the database
    await thought.save();

    return res.status(200).json({ message: 'Reaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting reaction:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
  addReaction,
  deleteReaction,
};
