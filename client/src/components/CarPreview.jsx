import React from "react";

const COLOR_MAP = {
  Black: "#1f2937",
  White: "#f8fafc",
  Red: "#dc2626",
  Blue: "#2563eb",
};

const CarPreview = ({ model, color, wheels, spoiler }) => {
  const modelClass = model.toLowerCase();
  const wheelClass = wheels.toLowerCase().replace("-", "");

  return (
    <section className="preview-section">
      <h2>Live Preview</h2>

      <div className={`car-preview ${modelClass}`}>
        <div
          className="car-body"
          style={{
            backgroundColor: COLOR_MAP[color],
          }}
        >
          <div className="car-window" />

          {spoiler && <div className="car-spoiler" />}
        </div>

        <div className={`car-wheel front-wheel ${wheelClass}`} />

        <div className={`car-wheel rear-wheel ${wheelClass}`} />
      </div>

      <p>
        {color} {model} with {wheels} wheels
      </p>
    </section>
  );
};

export default CarPreview;
