import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPlan = async () => {
    if (!city) return;

    setLoading(true);

    const response = await fetch(
      `https://tour-backend-bwcq.onrender.com/plan?city=${city}`
    );

    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🌍 AI Tour Planner</h1>

      <div style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: 10, width: 250, marginRight: 10 }}
        />
        <button
          onClick={getPlan}
          style={{
            padding: "10px 20px",
            backgroundColor: "#38bdf8",
            border: "none",
            cursor: "pointer"
          }}
        >
          Plan My Trip
        </button>
      </div>

      {loading && <p>Finding best places...</p>}

      {data && (
        <div>
          <h2>Top Places in {data.city}</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
            marginTop: 20
          }}>
            {data.places.map((place, index) => (
              <div key={index} style={{
                backgroundColor: "#1e293b",
                padding: 20,
                borderRadius: 10,
                textAlign: "left"
              }}>
                <h3>{place.name}</h3>

                {place.videos.map((video, i) => (
                  <a
                    key={i}
                    href={video}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", marginTop: 8, color: "#38bdf8" }}
                  >
                    ▶ Watch Guide {i + 1}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;