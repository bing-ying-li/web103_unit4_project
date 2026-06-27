import { pool } from "../config/database.js";

export const getAllCars = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM custom_cars ORDER BY id ASC",
    );

    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error getting cars:", error);

    res.status(500).json({
      error: "Unable to get cars",
    });
  }
};

const MODEL_PRICES = {
  Roadster: 30000,
  Coupe: 27000,
  SUV: 35000,
};

const COLOR_PRICES = {
  Black: 0,
  White: 0,
  Red: 1000,
  Blue: 1000,
};

const WHEEL_PRICES = {
  Standard: 0,
  Sport: 2000,
  "Off-road": 3000,
};

const INTERIOR_PRICES = {
  Fabric: 0,
  Leather: 2500,
  Premium: 4000,
};

const SPOILER_PRICE = 1500;

const calculatePrice = (model, color, wheels, interior, spoiler) => {
  return (
    MODEL_PRICES[model] +
    COLOR_PRICES[color] +
    WHEEL_PRICES[wheels] +
    INTERIOR_PRICES[interior] +
    (spoiler ? SPOILER_PRICE : 0)
  );
};

export const createCar = async (req, res) => {
  const { name, model, color, wheels, interior, spoiler = false } = req.body;

  if (!name || !model || !color || !wheels || !interior) {
    return res.status(400).json({
      error: "Please complete every required field",
    });
  }

  if (!MODEL_PRICES[model]) {
    return res.status(400).json({
      error: "Invalid car model",
    });
  }

  if (!(color in COLOR_PRICES)) {
    return res.status(400).json({
      error: "Invalid car color",
    });
  }

  if (!(wheels in WHEEL_PRICES)) {
    return res.status(400).json({
      error: "Invalid wheel option",
    });
  }

  if (!(interior in INTERIOR_PRICES)) {
    return res.status(400).json({
      error: "Invalid interior option",
    });
  }

  // Impossible combination
  if (model === "Roadster" && wheels === "Off-road") {
    return res.status(400).json({
      error: "Roadster cannot use off-road wheels",
    });
  }

  const price = calculatePrice(
    model,
    color,
    wheels,
    interior,
    Boolean(spoiler),
  );

  try {
    const results = await pool.query(
      `
        INSERT INTO custom_cars
          (name, model, color, wheels, interior, spoiler, price)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [name.trim(), model, color, wheels, interior, Boolean(spoiler), price],
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error("Error creating car:", error);

    res.status(500).json({
      error: "Unable to create car",
    });
  }
};
