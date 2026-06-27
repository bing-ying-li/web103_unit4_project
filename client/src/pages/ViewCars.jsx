import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllCars, deleteCar } from "../services/CarsAPI";

import "../App.css";

const ViewCars = ({ title }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    document.title = title;

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
  }, [title]);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteCar(id);

      setCars((previousCars) => previousCars.filter((car) => car.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="cars-page">
        <p>Loading cars...</p>
      </main>
    );
  }

  return (
    <main className="cars-page">
      <div className="cars-header">
        <div>
          <h1>Saved Cars</h1>
          <p>View, edit, or delete your custom cars.</p>
        </div>

        <Link className="primary-link" to="/">
          Create New Car
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {cars.length === 0 ? (
        <section className="empty-state">
          <h2>No cars saved yet</h2>

          <p>Create your first custom car to see it here.</p>

          <Link className="primary-link" to="/">
            Build a Car
          </Link>
        </section>
      ) : (
        <section className="cars-grid">
          {cars.map((car) => (
            <article className="car-card" key={car.id}>
              <div
                className="card-color-preview"
                style={{
                  backgroundColor:
                    car.color === "Black"
                      ? "#1f2937"
                      : car.color === "White"
                        ? "#f8fafc"
                        : car.color === "Red"
                          ? "#dc2626"
                          : "#2563eb",
                }}
              />

              <div className="car-card-content">
                <h2>{car.name}</h2>

                <p>
                  <strong>Model:</strong> {car.model}
                </p>

                <p>
                  <strong>Color:</strong> {car.color}
                </p>

                <p>
                  <strong>Wheels:</strong> {car.wheels}
                </p>

                <p>
                  <strong>Interior:</strong> {car.interior}
                </p>

                <p>
                  <strong>Spoiler:</strong> {car.spoiler ? "Yes" : "No"}
                </p>

                <p className="card-price">
                  ${Number(car.price).toLocaleString()}
                </p>

                <div className="card-actions">
                  <Link
                    className="card-button view-button"
                    to={`/customcars/${car.id}`}
                  >
                    View
                  </Link>

                  <Link
                    className="card-button edit-button"
                    to={`/edit/${car.id}`}
                  >
                    Edit
                  </Link>

                  <button
                    className="card-button delete-button"
                    type="button"
                    disabled={deletingId === car.id}
                    onClick={() => handleDelete(car.id, car.name)}
                  >
                    {deletingId === car.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default ViewCars;
