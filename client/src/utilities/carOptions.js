export const MODEL_OPTIONS = [
  { value: "Roadster", label: "Roadster", price: 30000 },
  { value: "Coupe", label: "Coupe", price: 27000 },
  { value: "SUV", label: "SUV", price: 35000 },
];

export const COLOR_OPTIONS = [
  { value: "Black", label: "Black", price: 0 },
  { value: "White", label: "White", price: 0 },
  { value: "Red", label: "Red", price: 1000 },
  { value: "Blue", label: "Blue", price: 1000 },
];

export const WHEEL_OPTIONS = [
  { value: "Standard", label: "Standard", price: 0 },
  { value: "Sport", label: "Sport", price: 2000 },
  { value: "Off-road", label: "Off-road", price: 3000 },
];

export const INTERIOR_OPTIONS = [
  { value: "Fabric", label: "Fabric", price: 0 },
  { value: "Leather", label: "Leather", price: 2500 },
  { value: "Premium", label: "Premium", price: 4000 },
];

export const SPOILER_PRICE = 1500;

const findPrice = (options, selectedValue) => {
  const option = options.find((item) => item.value === selectedValue);

  return option ? option.price : 0;
};

export const calculateCarPrice = (car) => {
  return (
    findPrice(MODEL_OPTIONS, car.model) +
    findPrice(COLOR_OPTIONS, car.color) +
    findPrice(WHEEL_OPTIONS, car.wheels) +
    findPrice(INTERIOR_OPTIONS, car.interior) +
    (car.spoiler ? SPOILER_PRICE : 0)
  );
};

export const validateCar = (car) => {
  if (!car.name.trim()) {
    return "Please enter a name for your car.";
  }

  if (car.model === "Roadster" && car.wheels === "Off-road") {
    return "Roadster cannot use off-road wheels.";
  }

  return "";
};
