# Todo App Backend

This is the backend part of the Todo application via test task. The server is built using Node.js and Express, and it provides an API for managing tasks.

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database used to store task data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

To run the backend locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using `npm install`.
4. Set up environment variables.
5. Start the server using `npm start`.

## API Routes
- GET /api/tasks: Retrieve all tasks.
- POST /api/tasks: Add a new task.
- PATCH /api/tasks/:id: Update the status of a task.
- DELETE /api/tasks/:id: Delete a task by ID.
- DELETE /api/tasks: Delete all tasks.

## Database
The project uses MongoDB as the database to store task information.
