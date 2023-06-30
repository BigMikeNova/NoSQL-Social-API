# Social Network API

Welcome to the Social Network API, a backend application that provides an API for a social network web application. Users can share their thoughts, react to friends' thoughts, and manage their friend list. This API is built using Express.js for routing, MongoDB for the database, and Mongoose as the ODM.

## Table of Contents
- [Walkthrough Video](#walkthrough-video)
- [GitHub Repository](#github-repository)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Walkthrough Video

To see the functionality of the Social Network API, please watch the walkthrough video.

[Link to Walkthrough Video](https://www.loom.com/share/ac27eeea31a44137a2821bf2a03fb977?sid=7ad7bbd4-bc90-4102-bf18-284d3a42bc11)

## GitHub Repository

To view the GitHub repository for this project, please visit the link below.

[Link to GitHub Repository](https://github.com/BigMikeNova/NoSQL-Social-API)

## Features

- User management: Create, retrieve, update, and delete users.
- Thought management: Create, retrieve, update, and delete thoughts.
- Reaction management: Add and remove reactions to thoughts.
- Friend management: Add and remove friends from a user's friend list.

## Technologies Used

- Express.js: Fast and minimalist web framework for Node.js.
- MongoDB: A NoSQL database for storing user, thought, and reaction data.
- Mongoose: A MongoDB object modeling tool for Node.js.
- JavaScript: The programming language used to build the application.
- Insomnia: A REST client for testing API endpoints.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- MongoDB (running locally or a connection to a remote MongoDB server)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
    ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up your MongoDB connection by modifying the 'connection' object in `config/connection.js`:

   ```javascript
    mongoose.connect('mongodb://127.0.0.1:27017/yourDBnameHere');
   ```

### Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Use a tool like Insomnia to test the available API endpoints.
   - Import the provided Insomnia workspace or manually create requests to the following endpoints:
     - Users:
       - `GET /api/users` - Retrieve all users
       - `GET /api/users/:userId` - Retrieve a single user by ID
       - `POST /api/users` - Create a new user
       - `PUT /api/users/:userId` - Update a user by ID
       - `DELETE /api/users/:userId` - Delete a user by ID
       - `POST /api/users/:userId/friends/:friendId` - Add a friend to a user's friend list
       - `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list
     - Thoughts:
       - `GET /api/thoughts` - Retrieve all thoughts
       - `GET /api/thoughts/:thoughtId` - Retrieve a single thought by ID
       - `POST /api/thoughts` - Create a new thought
       - `PUT /api/thoughts/:thoughtId` - Update a thought by ID
       - `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID
       - `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
       - `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Contribution

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

## License

The Social Network API is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

