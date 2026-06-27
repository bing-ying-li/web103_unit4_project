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
