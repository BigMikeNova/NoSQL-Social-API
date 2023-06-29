const express = require('express');
const mongoose = require('mongoose');
const app = express();

const MONGODB_URI = 'mongodb://localhost/social_network_db'; // Replace with your MongoDB connection URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});
