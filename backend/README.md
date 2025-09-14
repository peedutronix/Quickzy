# Quickzy Cleaning Backend API

This is the backend API for the Quickzy Cleaning service website. It handles quote requests from potential customers.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string: `MONGO_URI=your_connection_string`
   - Set port if needed (defaults to 5000): `PORT=5000`

3. Run the server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## API Endpoints

### Quotes

- `POST /api/quotes` - Submit a new quote request
- `GET /api/quotes` - Get all quote requests (would be protected in production)

## Models

### Quote

- name: String (required)
- email: String (required)
- phone: String (required)
- message: String (required)
- serviceType: String (required)
- createdAt: Date (default: current date)