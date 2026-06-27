import express from "express";

import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/cars.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);

router.post("/", createCar);

router.put("/:id", updateCar);

router.delete("/:id", deleteCar);

export default router;
