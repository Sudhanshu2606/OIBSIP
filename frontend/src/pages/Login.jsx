import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.leftSection}>
          <div style={styles.brand}>
            <h1 style={styles.brandName}>
              PIZZA<span style={{ color: "#e31837" }}>EXPRESS</span>
            </h1>
            <p style={styles.tagline}>Fast, Fresh & Delicious Pizza Delivery</p>
            <div style={styles.features}>
              <div>⭐ 4.8 Rating</div>
              <div>🚚 30 Min Delivery</div>
              <div>💰 Best Prices</div>
            </div>
          </div>
        </div>
        <div style={styles.rightSection}>
          <div style={styles.card}>
            <h2 style={styles.welcomeTitle}>Welcome Back! 👋</h2>
            <p style={styles.welcomeSubtitle}>
              Login to continue your pizza journey
            </p>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login →"}
              </button>
            </form>
            <p style={styles.footerText}>
              New to PIZZAEXPRESS?{" "}
              <Link to="/register" style={styles.link}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: 'url("/images/margherita.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10%",
  },
  leftSection: {
    flex: 1,
    color: "white",
  },
  brand: {
    textAlign: "left",
  },
  brandName: {
    fontSize: "56px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "15px",
  },
  tagline: {
    fontSize: "18px",
    opacity: 0.9,
    marginBottom: "30px",
  },
  features: {
    display: "flex",
    gap: "30px",
    fontSize: "14px",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    padding: "50px",
    borderRadius: "20px",
    width: "450px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  welcomeTitle: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#333",
  },
  welcomeSubtitle: {
    color: "#666",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "15px",
    border: "2px solid #eee",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "15px",
    background: "#e31837",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  footerText: {
    marginTop: "30px",
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#e31837",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
