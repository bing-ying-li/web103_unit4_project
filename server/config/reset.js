import { pool } from "./database.js";

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS custom_cars;

    CREATE TABLE custom_cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      model VARCHAR(50) NOT NULL,
      color VARCHAR(50) NOT NULL,
      wheels VARCHAR(50) NOT NULL,
      interior VARCHAR(50) NOT NULL,
      spoiler BOOLEAN NOT NULL DEFAULT FALSE,
      price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);

    console.log("✅ custom_cars table created successfully");
  } catch (error) {
    console.error("❌ Error creating custom_cars table:");
    console.error(error);
  } finally {
    await pool.end();
  }
};

createCarsTable();
