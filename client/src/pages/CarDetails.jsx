import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCar } from "../services/CarsAPI";
import CarPreview from "../components/CarPreview";

import "../App.css";

const CarDetails = ({ title }) => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = title;

    const loadCar = async () => {
      try {
        const data = await getCar(id);
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id, title]);

  if (loading) {
    return (
      <main className="details-page">
        <p>Loading car...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="details-page">
        <div className="error-message">{error}</div>

        <Link className="primary-link" to="/customcars">
          Back to Cars
        </Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <section className="details-card">
        <div className="details-information">
          <p className="details-label">Custom Vehicle</p>

          <h1>{car.name}</h1>

          <div className="details-list">
            <p>
              <strong>Model:</strong> {car.model}
            </p>

            <p>
              <strong>Exterior Color:</strong> {car.color}
            </p>

            <p>
              <strong>Wheels:</strong> {car.wheels}
            </p>

            <p>
              <strong>Interior:</strong> {car.interior}
            </p>

            <p>
              <strong>Rear Spoiler:</strong> {car.spoiler ? "Yes" : "No"}
            </p>
          </div>

          <div className="details-price">
            Total Price
            <strong>${Number(car.price).toLocaleString()}</strong>
          </div>

          <div className="details-actions">
            <Link className="primary-link" to={`/edit/${car.id}`}>
              Edit Car
            </Link>

            <Link className="secondary-link" to="/customcars">
              Back to Cars
            </Link>
          </div>
        </div>

        <CarPreview
          model={car.model}
          color={car.color}
          wheels={car.wheels}
          spoiler={car.spoiler}
        />
      </section>
    </main>
  );
};

export default CarDetails;
