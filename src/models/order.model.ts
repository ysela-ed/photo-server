import mongoose from 'mongoose';
import type { Order } from '../types/index.js';

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  fullAddress: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  frameColor: { type: String, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true
});

export const OrderModel = mongoose.model<Order>('Order', orderSchema);
