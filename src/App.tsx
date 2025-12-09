import { useState } from 'react'
import bg from './assets/car-parking-scaled.jpg'
import './App.css'

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
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <h1>DESIOT</h1>

      {/* Sensor cards */}
      <section className="sensors">
        <div className="sensor-row">
          <SensorCard title="Temperature" value="--" unit="°C" size="normal" />
          <SensorCard title="Humidity" value="--" unit="%" size="normal"/>
        </div>
        <SensorCard title="Cars Detected" value="NO" unit=" " size="wide" />
      </section>
    </div>
  );
}

export default App
