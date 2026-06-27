import React, { useEffect, useState } from "react";
import { getAllCars } from "../services/CarsAPI";
import "../App.css";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Saved Cars</h1>

      {cars.length === 0 ? (
        <p>No cars have been created yet.</p>
      ) : (
        cars.map((car) => (
          <article key={car.id}>
            <h2>{car.name}</h2>

            <p>Model: {car.model}</p>
            <p>Color: {car.color}</p>
            <p>Wheels: {car.wheels}</p>
            <p>Interior: {car.interior}</p>
            <p>Spoiler: {car.spoiler ? "Yes" : "No"}</p>
            <p>Price: ${Number(car.price).toLocaleString()}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default ViewCars;
