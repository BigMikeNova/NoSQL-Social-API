// routes/thoughtRoutes.js

const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', thoughtController.getAllThoughts);

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', thoughtController.getThoughtById);

// POST a new thought
router.post('/thoughts', thoughtController.createThought);

// PUT to update a thought by its _id
router.put('/thoughts/:thoughtId', thoughtController.updateThoughtById);

// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', thoughtController.deleteThoughtById);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', thoughtController.createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;
