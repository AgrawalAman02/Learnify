# Learnify Server (Backend)

## Introduction

The Learnify server is a Node.js application built with Express.js. It provides a RESTful API for managing users, courses, lectures, payments, and course progress.

## Features

- **RESTful API**: Provides endpoints for managing users, courses, lectures, payments, and course progress.
- **JWT Authentication**: Uses JSON Web Tokens for user authentication and authorization.
- **MongoDB Integration**: Uses Mongoose ODM to interact with MongoDB.
- **Cloudinary Integration**: Uploads and manages media files using Cloudinary.
- **Razorpay Integration**: Handles payment processing using Razorpay.
- **Email Notifications**: Sends email notifications using Nodemailer with Gmail.
- **Role-Based Access Control**: Restricts access to certain endpoints based on user roles (Student/Instructor).

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary for media
- **Payment Gateway**: Razorpay
- **Email Service**: Nodemailer with Gmail

## Directory Structure

```
server/
├── config/            # Configuration files
│   └── database.js    # MongoDB connection
├── controllers/       # Request handlers
│   ├── course.controller.js   # Course-related controllers
│   ├── lecture.controller.js  # Lecture-related controllers
│   ├── payment.controller.js  # Payment-related controllers
│   ├── profile.controller.js  # User profile-related controllers
│   └── user.controller.js      # User authentication-related controllers
├── middlewares/       # Custom middleware
│   └── userAuth.js      # User authentication middleware
├── models/            # Mongoose models
│   ├── course.js        # Course model
│   ├── lecture.js       # Lecture model
│   ├── payment.js       # Payment model
│   └── user.js          # User model
├── routes/            # API routes
│   ├── course.routes.js       # Course routes
│   ├── courseProgress.routes.js # Course progress routes
│   ├── media.routes.js        # Media upload routes
│   ├── payment.routes.js      # Payment routes
│   ├── profile.routes.js      # User profile routes
│   └── user.routes.js         # User authentication routes
├── utils/             # Utility functions
│   ├── cloudinary.js    # Cloudinary integration
│   ├── email.js         # Email sending
│   ├── multer.js        # Multer configuration for file uploads
│   └── passwordResetLimiter.js # Rate limiter for password reset
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Dependencies and scripts
└── server.js          # Main server file
```

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB

### Clone the Repository
```bash
git clone https://github.com/yourusername/learnify.git
cd learnify/server
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the `server` directory and add the following:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learnify
JWT_SECRET_KEY=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
GMAIL_EMAIL=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Run the Server
```bash
npm run dev
```

## Key Components

### config/
- **database.js**: Configures the MongoDB connection using Mongoose.

### controllers/
- **course.controller.js**: Handles course-related requests (create, get, update, publish, search).
- **lecture.controller.js**: Handles lecture-related requests (create, get, update, delete).
- **payment.controller.js**: Handles payment-related requests (create order, verify payment).
- **profile.controller.js**: Handles user profile-related requests (get profile, update profile).
- **user.controller.js**: Handles user authentication-related requests (register, login, logout, forgot password, reset password).

### middlewares/
- **userAuth.js**: Middleware for authenticating users using JWT.

### models/
- **course.js**: Mongoose model for courses.
- **lecture.js**: Mongoose model for lectures.
- **payment.js**: Mongoose model for payments.
- **user.js**: Mongoose model for users.

### routes/
- **user.routes.js**: Defines routes for user authentication.
- **profile.routes.js**: Defines routes for user profile management.
- **course.routes.js**: Defines routes for course management.
- **payment.routes.js**: Defines routes for payment processing.
- **courseProgress.routes.js**: Defines routes for tracking course progress.

### utils/
- **cloudinary.js**: Utility functions for uploading and deleting media files from Cloudinary.
- **email.js**: Utility function for sending emails using Nodemailer with Gmail.
- **multer.js**: Configuration for Multer middleware to handle file uploads.
- **passwordResetLimiter.js**: Rate limiter for password reset requests.

## Data Flow

1. **Request Handling**: The server receives HTTP requests from the client.
2. **Authentication**: The `userAuth` middleware verifies the JWT token in the request headers.
3. **Controller Logic**: The appropriate controller function handles the request, interacting with the database and external services as needed.
4. **Response**: The controller sends a JSON response back to the client.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.