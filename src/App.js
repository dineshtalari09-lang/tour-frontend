import React, { useState, useEffect, useRef } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const messagesEndRef = useRef(null);

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

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderAssistantMessage = (content, index) => {
    const sections = content.split("\n\n");

    return (
      <div>
        {sections.slice(0, 2).map((section, i) => (
          <p key={i}>{section}</p>
        ))}

        {sections.length > 2 && (
          <>
            <button
              onClick={() => toggleExpand(index)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg,#3b82f6,#9333ea)",
                color: "white",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {expandedIndex === index ? "Hide Details" : "View Full Plan"}
            </button>

            {expandedIndex === index && (
              <div style={{ marginTop: "10px" }}>
                {sections.slice(2).map((section, i) => (
                  <p key={i}>{section}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.05)",
          padding: "20px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          boxShadow: "0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          ✨ AI Travel Assistant
        </h1>

        <div style={{ flex: 1, overflowY: "auto", marginBottom: "15px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: "15px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg,#3b82f6,#9333ea)"
                      : "rgba(255,255,255,0.1)",
                  color: "white",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.role === "assistant"
                  ? renderAssistantMessage(msg.content, index)
                  : msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ color: "white", opacity: 0.7 }}>
              ✨ AI is designing your experience...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
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
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#3b82f6,#9333ea)",
              color: "white",
              fontWeight: "600",
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