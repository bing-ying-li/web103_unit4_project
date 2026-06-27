const API_URL = "/api/cars";

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

export const getAllCars = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response);
};

export const getCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
};

export const createCar = async (car) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  return handleResponse(response);
};

export const updateCar = async (id, car) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  return handleResponse(response);
};

export const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};
