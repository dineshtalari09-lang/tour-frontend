import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const getPlan = async () => {
  if (!city) return;

  setLoading(true);
  setDisplayText("");

  const response = await fetch(
    `https://tour-backend-bwcq.onrender.com/plan?query=Plan a 2 day trip to ${city}`
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    setDisplayText((prev) => prev + chunk);
  }

  setLoading(false);
};

  // Typing animation effect
  useEffect(() => {
    if (!data) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + data.charAt(index));
      index++;
      if (index >= data.length) {
        clearInterval(interval);
      }
    }, 15); // speed (lower = faster)

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.05)",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "900px",
          boxShadow: "0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          ✨ AI Luxury Travel Planner
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Enter destination..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              padding: "12px",
              width: "60%",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              marginRight: "10px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          />

          <button
            className="luxury-button"
            onClick={getPlan}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#3b82f6,#9333ea)",
              color: "white",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            Plan
          </button>
        </div>

        {loading && (
          <p style={{ textAlign: "center" }}>
            Designing your luxury experience...
          </p>
        )}

        {displayText && (
          <div
            className="response-card"
            style={{
              background: "rgba(255,255,255,0.07)",
              padding: "25px",
              borderRadius: "15px",
              lineHeight: "1.7",
              whiteSpace: "pre-wrap",
            }}
          >
            {displayText}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;