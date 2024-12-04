import type { Request, Response } from "express";
import { OrderModel } from "../models/order.model.js";
import type { Order } from "../types/index.js";

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const requiredFields: Array<keyof Order> = [
        "email",
        "fullName",
        "fullAddress",
        "imageUrls",
        "frameColor",
        "userId",
      ];

      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        res.status(400).json({
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
        return;
      }

      // TODO: Use a library?
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
        return;
      }

      // Validate frame color (hex format)
      if (!/^#[0-9A-Fa-f]{6}$/.test(req.body.frameColor)) {
        res.status(400).json({
          success: false,
          error: "Frame color must be a valid hex color",
        });
        return;
      }

      const order = new OrderModel(req.body);
      await order.save();

      res.status(201).json({
        success: true,
        data: order,
      });
    } catch {
      res.status(400).json({
        success: false,
        error: "Invalid order data",
      });
    }
  }

  async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId?.trim()) {
        res.status(400).json({
          success: false,
          error: "User ID is required",
        });
        return;
      }

      const orders = await OrderModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(100);

      res.json({
        success: true,
        data: orders,
      });
    } catch {
      res.status(500).json({
        success: false,
        error: "Failed to fetch orders",
      });
    }
  }
}
