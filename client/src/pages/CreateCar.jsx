import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCar } from "../services/CarsAPI";
import CarPreview from "../components/CarPreview";

import {
  MODEL_OPTIONS,
  COLOR_OPTIONS,
  WHEEL_OPTIONS,
  INTERIOR_OPTIONS,
  SPOILER_PRICE,
  calculateCarPrice,
  validateCar,
} from "../utilities/carOptions";

import "../App.css";

const initialCar = {
  name: "",
  model: "Coupe",
  color: "Black",
  wheels: "Standard",
  interior: "Fabric",
  spoiler: false,
};

const CreateCar = ({ title }) => {
  const navigate = useNavigate();

  const [car, setCar] = useState(initialCar);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = calculateCarPrice(car);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setError("");

    if (name === "model") {
      setCar((previousCar) => ({
        ...previousCar,
        model: value,
        wheels:
          value === "Roadster" && previousCar.wheels === "Off-road"
            ? "Standard"
            : previousCar.wheels,
      }));

      return;
    }

    setCar((previousCar) => ({
      ...previousCar,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateCar(car);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await createCar(car);

      navigate("/customcars");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-container">
      <section className="form-section">
        <h1>Build Your Car</h1>

        <p>
          Select your options and create your own custom Bolt Bucket vehicle.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Car Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={car.name}
            onChange={handleChange}
            placeholder="Example: Midnight Rocket"
            maxLength="100"
            required
          />

          <label htmlFor="model">Model</label>

          <select
            id="model"
            name="model"
            value={car.model}
            onChange={handleChange}
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} — ${option.price.toLocaleString()}
              </option>
            ))}
          </select>

          <label htmlFor="color">Exterior Color</label>

          <select
            id="color"
            name="color"
            value={car.color}
            onChange={handleChange}
          >
            {COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                {option.price > 0
                  ? ` — +$${option.price.toLocaleString()}`
                  : " — Included"}
              </option>
            ))}
          </select>

          <label htmlFor="wheels">Wheels</label>

          <select
            id="wheels"
            name="wheels"
            value={car.wheels}
            onChange={handleChange}
          >
            {WHEEL_OPTIONS.map((option) => {
              const isUnavailable =
                car.model === "Roadster" && option.value === "Off-road";

              return (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={isUnavailable}
                >
                  {option.label}
                  {option.price > 0
                    ? ` — +$${option.price.toLocaleString()}`
                    : " — Included"}
                  {isUnavailable ? " — Not available for Roadster" : ""}
                </option>
              );
            })}
          </select>

          {car.model === "Roadster" && (
            <p className="warning-message">
              Off-road wheels are not compatible with the Roadster.
            </p>
          )}

          <label htmlFor="interior">Interior</label>

          <select
            id="interior"
            name="interior"
            value={car.interior}
            onChange={handleChange}
          >
            {INTERIOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                {option.price > 0
                  ? ` — +$${option.price.toLocaleString()}`
                  : " — Included"}
              </option>
            ))}
          </select>

          <label className="checkbox-row">
            <input
              name="spoiler"
              type="checkbox"
              checked={car.spoiler}
              onChange={handleChange}
            />
            Add rear spoiler (+${SPOILER_PRICE.toLocaleString()})
          </label>

          <div className="price-display">
            Total Price:
            <strong>${totalPrice.toLocaleString()}</strong>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Custom Car"}
          </button>
        </form>
      </section>

      <CarPreview
        model={car.model}
        color={car.color}
        wheels={car.wheels}
        spoiler={car.spoiler}
      />
    </main>
  );
};

export default CreateCar;
