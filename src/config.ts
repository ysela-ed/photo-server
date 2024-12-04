import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/photo-server',
  pixabayApiKey: process.env.PIXABAY_API_KEY,
  pixabayBaseUrl: 'https://pixabay.com/api/'
};