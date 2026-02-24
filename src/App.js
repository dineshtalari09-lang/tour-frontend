import React, { useState, useEffect, useRef } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://tour-backend-bwcq.onrender.com/plan?query=${encodeURIComponent(input)}`
      );

      const result = await response.json();

      const aiMessage = {
        role: "assistant",
        content: result.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: window.innerWidth < 600 ? "20px 10px" : "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.05)",
          padding: window.innerWidth < 600 ? "20px" : "30px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          height: window.innerWidth < 600 ? "90vh" : "85vh",
          boxShadow: "0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "600",
            fontSize: window.innerWidth < 600 ? "20px" : "26px",
            letterSpacing: "1px",
          }}
        >
          ✨ AI Travel Assistant
        </h1>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "15px",
            paddingRight: "5px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className="message-bubble"
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  maxWidth: window.innerWidth < 600 ? "85%" : "70%",
                  padding: "12px 16px",
                  borderRadius: "15px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg,#3b82f6,#9333ea)"
                      : "rgba(255,255,255,0.1)",
                  color: "white",
                  whiteSpace: "pre-wrap",
                  fontSize: window.innerWidth < 600 ? "14px" : "15px",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                color: "white",
                opacity: 0.7,
                fontStyle: "italic",
                fontSize: "14px",
              }}
            >
              ✨ AI is designing your experience...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 600 ? "column" : "row",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={input}
            placeholder="Ask about any destination..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "14px",
            }}
          />

          <button
            onClick={sendMessage}
            className="luxury-button"
            style={{
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#3b82f6,#9333ea)",
              color: "white",
              fontWeight: "600",
              transition: "all 0.3s ease",
              width: window.innerWidth < 600 ? "100%" : "auto",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;