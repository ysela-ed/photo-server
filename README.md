# Photo Order API

Simple Node.js/TypeScript API that integrates with Pixabay to manage photo orders.

## Setup and Run

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Pixabay API key to .env:
PIXABAY_API_KEY=your_key_here
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/photo-server

# Ensure MongoDB is running
# Windows: net start MongoDB
# Mac/Linux: mongod

# Start development server
npm run dev
```

## API Endpoints

### GET /api/photos

Get photos from Pixabay

```bash
curl "http://localhost:3000/api/photos?count=5"
```

### POST /api/orders

Create new order

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fullName": "Test User",
    "fullAddress": "123 Test St",
    "imageUrls": ["https://example.com/image.jpg"],
    "frameColor": "#000000",
    "userId": "user123"
  }'
```

### GET /api/users/:userId/orders

Get user's orders

```bash
curl "http://localhost:3000/api/users/user123/orders"
```

## Project Structure

```
src/
  ├── controllers/     # Request handlers
  ├── models/         # Database schemas
  ├── routes/         # API routes
  ├── types/          # TypeScript types
  ├── app.ts         # Express app setup
  └── index.ts       # Entry point
```

## Core Features Implemented

- Basic Express server setup
- MongoDB integration
- Pixabay API integration
- Simple caching
- Basic error handling
- Type safety with TypeScript

## What Could Be Added (Beyond 2.5 Hours)

- Input validation
- Authentication
- Comprehensive testing
- Error logging
- Rate limiting
- API documentation

## Tech Stack

- Node.js & TypeScript
- Express.js
- MongoDB with Mongoose
- Node-Cache
