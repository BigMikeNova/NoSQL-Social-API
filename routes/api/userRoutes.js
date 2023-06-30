const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/users', userController.getAllUsers);

// GET a single user by its _id and populated thought and friend data
router.get('/users/:userId', userController.getUserById);

// POST a new user
router.post('/users', userController.createUser);

// PUT to update a user by its _id
router.put('/users/:userId', userController.updateUserById);

// DELETE to remove user by its _id
router.delete('/users/:userId', userController.deleteUserById);

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', userController.addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', userController.removeFriend);


module.exports = router;
