const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
  },
];

// Sample thought data
const thoughts = [
  {
    thoughtText: 'Hello, world!',
    username: 'john_doe',
  },
  {
    thoughtText: 'I love coding!',
    username: 'jane_smith',
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const createdUsers = await User.create(users);

    // Create thoughts
    const thoughtsWithUsers = thoughts.map((thought) => {
      const user = createdUsers.find((user) => user.username === thought.username);
      return { ...thought, userId: user._id };
    });
    await Thought.create(thoughtsWithUsers);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Seed the database
seedDatabase();
