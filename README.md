# Booklers

Booklers is an e-commerce bookstore that allows users to browse and purchase books while granting administrative privileges exclusively to the admin for managing books. Built with React, MongoDB, and Firebase, it provides a seamless and secure experience for book enthusiasts.

## Live Demo

[Booklers Live](https://booklers.vercel.app/)

**Note:** The backend is hosted on Render, so it might take 1-2 minutes to load the data initially.

## Features

- User authentication with Firebase
- Admin-only book management (add, update, delete books)
- Users can browse and purchase books
- Secure transactions and order processing
- Real-time database management with MongoDB
- Image storage with Firebase Storage
- Responsive UI built with React and Tailwind CSS
- Smooth user experience with optimized performance

## Tech Stack

- **Frontend**: React.js, Tailwind CSS (Hosted on Vercel)
- **Backend**: Node.js, Express.js, MongoDB (Hosted on Render)
- **Authentication**: Firebase Authentication
- **Image Storage**: Firebase Storage

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/booklers.git
   cd booklers
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Storage
   - Get your Firebase config and create a `.env` file:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```
4. Set up MongoDB:
   - Create a MongoDB database using [MongoDB Atlas](https://www.mongodb.com/atlas/database) or a local instance.
   - Add your MongoDB connection string to the `.env` file:
     ```env
     MONGO_URI=your_mongodb_connection_string
     ```
5. Run the development server:
   ```sh
   npm start
   ```

## Deployment

- **Frontend Deployment (Vercel):**

  ```sh
  vercel
  ```

  Ensure you have the Vercel CLI installed and connected to your account.

- **Backend Deployment (Render):**

  - Push your backend code to GitHub
  - Create a new service on Render and connect it to your repository
  - Set up environment variables for MongoDB and Firebase
  - Deploy the service

## Contributing

Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For inquiries, reach out via himanshukotia9@gmail.com
