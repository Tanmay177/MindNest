import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are ChatGPT, a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      <h1
        style={{
          marginTop: 48,
          marginBottom: 24,
          fontWeight: 700,
          fontSize: 40,
          background: "linear-gradient(90deg, #6366f1 30%, #38bdf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 2,
        }}
      >
        MindNest
      </h1>
      <div
        style={{
          border: "1.5px solid #e0e7ff",
          borderRadius: 18,
          boxShadow: "0 4px 24px 0 rgba(99,102,241,0.08)",
          padding: 24,
          minHeight: 320,
          marginBottom: 24,
          background: "linear-gradient(120deg, #f1f5f9 60%, #e0e7ff 100%)",
          width: "100%",
          maxWidth: 600,
          transition: "box-shadow 0.2s",
        }}
      >
        {messages.filter(m => m.role !== "system").map((m, i) => (
          <div
            key={i}
            style={{
              margin: "12px 0",
              textAlign: m.role === "user" ? "right" : "left",
              background: m.role === "user"
                ? "linear-gradient(90deg, #c7d2fe 60%, #bae6fd 100%)"
                : "linear-gradient(90deg, #f0fdf4 60%, #e0e7ff 100%)",
              color: m.role === "user" ? "#334155" : "#475569",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              display: "inline-block",
              padding: "10px 18px",
              maxWidth: "85%",
              boxShadow: m.role === "user"
                ? "0 2px 8px 0 rgba(59,130,246,0.08)"
                : "0 2px 8px 0 rgba(16,185,129,0.08)",
              fontSize: 17,
            }}
          >
            <b style={{ fontWeight: 600 }}>{m.role === "user" ? "You" : "MindNest"}:</b> {m.content}
          </div>
        ))}
        {loading && (
          <div
            style={{
              margin: "12px 0",
              textAlign: "left",
              color: "#6366f1",
              fontStyle: "italic",
              fontSize: 16,
            }}
          >
            MindNest is typing...
          </div>
        )}
      </div>
      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          gap: 12,
          width: "100%",
          maxWidth: 600,
          background: "#f8fafc",
          borderRadius: 12,
          boxShadow: "0 2px 8px 0 rgba(99,102,241,0.04)",
          padding: 10,
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            border: "1.5px solid #c7d2fe",
            outline: "none",
            fontSize: 16,
            background: "#f1f5f9",
            color: "#334155",
            transition: "border 0.2s",
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "0 28px",
            borderRadius: 8,
            border: "none",
            background: loading || !input.trim()
              ? "linear-gradient(90deg, #c7d2fe 60%, #bae6fd 100%)"
              : "linear-gradient(90deg, #6366f1 60%, #38bdf8 100%)",
            color: loading || !input.trim() ? "#64748b" : "#fff",
            fontWeight: 600,
            fontSize: 16,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px 0 rgba(99,102,241,0.08)",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
} 