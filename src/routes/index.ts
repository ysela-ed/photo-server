import { Router } from "express";
import { PhotoController } from "../controllers/photo.controller.js";
import { OrderController } from "../controllers/order.controller.js";

export const router = Router();
const photoController = new PhotoController();
const orderController = new OrderController();

router.get("/photos", (req, res) => photoController.getPhotos(req, res));
router.post("/orders", (req, res) => orderController.createOrder(req, res));
router.get("/users/:userId/orders", (req, res) =>
  orderController.getUserOrders(req, res)
);
