import { useState, useEffect } from "react";
import bg from "./assets/car-parking-scaled.jpg";
import "./App.css";

// Reusable SensorCard component
function SensorCard({ title, value, unit, size = "normal" }) {
  return (
    <div className={`sensor-card ${size}`}>
      <h2>{title}</h2>
      <p className="sensor-value">
        {value} {unit}
      </p>
    </div>
  );
}

function App() {
  const [temperature, setTemperature] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [distance, setDistance] = useState("--");

  useEffect(() => {
    const fetchSensorData = () => {
      fetch("http://192.168.200.48:1880/data/sensor1")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not OK");
          }
          return res.json();
        })
        .then((data) => {
          setTemperature(data.temperature);
          setHumidity(data.humidity);
          setDistance(data.distance_cm);
        })
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchSensorData();                         // initial load
    const interval = setInterval(fetchSensorData, 2000); // repeat every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <h1>TPark - BALLS</h1>

      <section className="sensors">
        <div className="sensor-row">
          <SensorCard title="Temperature" value={temperature} unit="°C" />
          <SensorCard title="Humidity" value={humidity} unit="%" />
        </div>

        <div className="sensor-row">
          <SensorCard title="Distance" value={distance} unit="cm" />
          <SensorCard
            title="Car Detected"
            value={distance < 60 ? "YES" : "NO"}
            unit=""
          />
        </div>
        <div className="sensor-row">
          <SensorCard title="Weather" value="Sunny Day" unit="" size="wide"/>
        </div>
      </section>
    </div>
  );
}

export default App;
