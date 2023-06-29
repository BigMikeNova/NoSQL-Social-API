const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

const MONGODB_URI = 'mongodb://localhost/dreamsDB'; // Replace with your MongoDB connection URI

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

// Middleware setup
app.use(express.json());

// Routes setup
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});