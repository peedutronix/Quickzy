# Quickzy Cleaning Website

A full-stack web application for Quickzy Cleaning services, featuring a static frontend and a Node.js backend API for handling quote requests.

## Project Structure

```
quickzy-cleaning/
│
├── backend/               # Node.js + Express + MongoDB
│   ├── index.js           # Main entry point
│   ├── models/            # Mongoose models
│   │   └── Quote.js       # Quote model schema
│   ├── routes/            # API routes
│   │   └── quoteRoutes.js # Quote API endpoints
│   ├── .env               # Environment variables (Mongo URI, etc.)
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
│
├── frontend/              # Static site (HTML, CSS, JS)
│   ├── index.html         # Homepage
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript for frontend
│   │   └── form.js        # Form handling script
│   └── assets/            # Images, logos, icons
│
└── README.md              # This file
```

## Setup and Installation

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Update the `.env` file with your MongoDB connection string

4. Start the server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend

The frontend is a static website that can be served using any web server. For development, you can use:

1. Visual Studio Code's Live Server extension
2. Python's built-in HTTP server:
   ```
   cd frontend
   python -m http.server
   ```
   The website will be available at http://localhost:8000

## Features

- Responsive design for all device sizes
- Quote request form with validation
- Backend API for storing quote requests in MongoDB
- Modern, clean UI showcasing cleaning services

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API design