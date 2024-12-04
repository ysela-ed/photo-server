import type { Request, Response } from "express";
import { PixabayService } from "../services/pixabay.service.js";

export class PhotoController {
  async getPhotos(req: Request, res: Response): Promise<void> {
    const count = Number(req.query.count) || 10;

    try {
      const pixabayService = PixabayService.getInstance();
      const photos = await pixabayService.getPhotos(count);
      res.json({ success: true, data: photos });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Count must be between")
      ) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: "Failed to fetch photos",
      });
    }
  }
}
