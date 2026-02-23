import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const getPlan = async () => {
    const response = await fetch(
      `https://tour-backend-bwcq.onrender.com/plan?city=${city}`
    );
    const data = await response.json();
    setResult(data.trip_plan);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🌍 AI Tour Planner</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getPlan}>
        Plan My Trip
      </button>

      <div style={{ marginTop: 30 }}>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default App;