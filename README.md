# Learning Hub

This repository holds the source for the GG Practicum Team 3's application "Learning Hub", which is combined into a monorepo.

## Project Overview

Learning Hub is an educational platform designed to support students and teachers. The backend is built using Firebase services to manage data and authentication securely, while the frontend uses Vite + React.

## Technologies Used

  - **Firebase**: A platform for building mobile and web applications.
  - **Firestore Database**: For storing and syncing data.
  - **Firebase Authentication**: For managing user authentication.
  - **Express.js**: For running the backend server.
  - **React**: For creating the frontend UI.
  - **Vite**: The build tool used for the frontend.

## Environment Setup

To run this application, you must have a `.env` file with the necessary private keys and a Firebase Admin SDK file in the backend folder.

To obtain the `.env` file and Firebase Admin SDK file, please send a message to Edith on Slack.

## Running the Application

Install the required packages and start the application, follow these steps:

1. Install the required packages for this application.

   ```bash
   npm install
   ```
2. Run both the frontend and backend together using the `dev` script.

    ```bash
    npm run dev
    ```


### API Documentation

This project includes comprehensive API documentation generated with [Swagger](https://swagger.io/). You can explore and test the API endpoints using the Swagger UI available at: `http://localhost:8000/api-docs`. Ensure that you have the server running before accessing the documentation.

