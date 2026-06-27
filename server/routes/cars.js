import express from "express";
import { getAllCars, createCar } from "../controllers/cars.js";

const router = express.Router();

router.get("/", getAllCars);
router.post("/", createCar);

export default router;
