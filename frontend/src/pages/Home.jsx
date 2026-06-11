import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/margherita.jpg",
      title: "Margherita Pizza",
      desc: "Classic cheese & tomato sauce",
      price: "₹299",
    },
    {
      image: "/images/pepperoni.jpg",
      title: "Pepperoni Pizza",
      desc: "Double pepperoni with extra cheese",
      price: "₹399",
    },
    {
      image: "/images/bbq-chicken.jpg",
      title: "BBQ Chicken",
      desc: "Grilled chicken in BBQ sauce",
      price: "₹449",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: "🍕", title: "Fresh Pizzas", desc: "Made with love daily" },
    { icon: "⚡", title: "Fast Delivery", desc: "30 minutes or free" },
    { icon: "💰", title: "Best Price", desc: "Starting ₹199" },
    { icon: "🎁", title: "Free Gifts", desc: "On every order" },
  ];

  const categories = [
    { name: "Veg Pizzas", icon: "🥬", items: "12 items", color: "#4caf50" },
    { name: "Non-Veg Pizzas", icon: "🍗", items: "8 items", color: "#e31837" },
    { name: "Pasta", icon: "🍝", items: "6 items", color: "#ff9800" },
    { name: "Sides", icon: "🍟", items: "10 items", color: "#9c27b0" },
  ];

  const popularItems = [
    {
      name: "Margherita",
      price: 299,
      image: "/images/margherita.jpg",
      rating: "4.8",
      desc: "Fresh mozzarella, tomato sauce",
    },
    {
      name: "Pepperoni",
      price: 399,
      image: "/images/pepperoni.jpg",
      rating: "4.9",
      desc: "Double pepperoni feast",
    },
    {
      name: "Farmhouse",
      price: 349,
      image: "/images/farmhouse.jpg",
      rating: "4.7",
      desc: "Bell peppers, onions, mushrooms",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span style={{ fontSize: "24px", fontWeight: "800" }}>
            PIZZA<span style={{ color: "#e31837" }}>EXPRESS</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <button style={styles.navBtn} onClick={() => navigate("/")}>
            HOME
          </button>
          <button style={styles.navBtn} onClick={() => navigate("/customize")}>
            CUSTOM PIZZA
          </button>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <button style={styles.loginBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            style={styles.signupBtn}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Slider */}
      <div
        style={{ position: "relative", height: "600px", overflow: "hidden" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 0.8s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            <h1 style={{ fontSize: "56px", marginBottom: "20px" }}>
              {slide.title}
            </h1>
            <p style={{ fontSize: "20px", marginBottom: "15px" }}>
              {slide.desc}
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "30px",
                color: "#e31837",
              }}
            >
              {slide.price}
            </p>
            <button
              onClick={() => navigate("/customize")}
              style={styles.heroBtn}
            >
              Order Now →
            </button>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "2px",
                background: currentSlide === index ? "#e31837" : "white",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          marginTop: "-40px",
          marginBottom: "60px",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 10,
        }}
      >
        {features.map((f, i) => (
          <div key={i} style={styles.featureCard}>
            <span style={{ fontSize: "45px" }}>{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          🍽️ Explore Categories
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{ ...styles.categoryCard, borderBottomColor: cat.color }}
            >
              <span style={{ fontSize: "50px" }}>{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.items}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Banner */}
      <div style={styles.offerBanner}>
        <h2 style={{ fontSize: "36px", marginBottom: "15px" }}>
          🎉 Limited Time Offer! 🎉
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Get 50% OFF on your first order + Free Delivery
        </p>
        <button onClick={() => navigate("/register")} style={styles.offerBtn}>
          Grab Offer →
        </button>
      </div>

      {/* Popular Items */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          🔥 Most Popular
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          {popularItems.map((item, i) => (
            <div key={i} style={styles.popularCard}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <h3>{item.name}</h3>
                  <span style={{ color: "#ff9800" }}>⭐ {item.rating}</span>
                </div>
                <p style={{ color: "#666", marginBottom: "15px" }}>
                  {item.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#e31837",
                    }}
                  >
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => navigate("/customize")}
                    style={styles.smallBtn}
                  >
                    Order →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={{ fontSize: "36px", marginBottom: "15px" }}>
          Craving Something Delicious?
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "25px" }}>
          Order now and get 50% OFF on your first order!
        </p>
        <button onClick={() => navigate("/register")} style={styles.ctaBtn}>
          Order Now →
        </button>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
          }}
        >
          <div>
            <h3 style={{ color: "#e31837" }}>PIZZAEXPRESS</h3>
            <p>Your favorite pizza destination</p>
          </div>
          <div>
            <h4 style={{ color: "white" }}>Quick Links</h4>
            <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Home
            </p>
            <p
              onClick={() => navigate("/customize")}
              style={{ cursor: "pointer" }}
            >
              Custom Pizza
            </p>
          </div>
          <div>
            <h4 style={{ color: "white" }}>Contact</h4>
            <p>📞 1800-PIZZA-123</p>
            <p>📧 order@pizzaexpress.com</p>
          </div>
          <div>
            <h4 style={{ color: "white" }}>Follow Us</h4>
            <p>📱 Instagram</p>
            <p>📘 Facebook</p>
            <p>🐦 Twitter</p>
          </div>
        </div>
        <div style={styles.copyright}>
          © 2024 PIZZAEXPRESS - All rights reserved
        </div>
      </div>
    </div>
  );
}

const styles = {
  navBtn: {
    background: "none",
    border: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    padding: "8px 0",
  },
  loginBtn: {
    background: "none",
    border: "1px solid #e31837",
    color: "#e31837",
    padding: "8px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  signupBtn: {
    background: "#e31837",
    color: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  heroBtn: {
    background: "#e31837",
    color: "white",
    border: "none",
    padding: "15px 45px",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  featureCard: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    width: "200px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  categoryCard: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    cursor: "pointer",
    borderBottom: "3px solid",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },
  offerBanner: {
    background: "linear-gradient(135deg, #e31837 0%, #ff6b35 100%)",
    margin: "60px 20px",
    borderRadius: "20px",
    padding: "50px",
    textAlign: "center",
    color: "white",
  },
  offerBtn: {
    background: "white",
    color: "#e31837",
    border: "none",
    padding: "12px 30px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  popularCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  smallBtn: {
    background: "#e31837",
    color: "white",
    border: "none",
    padding: "6px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  ctaSection: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    margin: "40px 20px",
    borderRadius: "20px",
    padding: "60px",
    textAlign: "center",
    color: "white",
  },
  ctaBtn: {
    background: "white",
    color: "#764ba2",
    border: "none",
    padding: "15px 40px",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    background: "#1a1a1a",
    color: "#999",
    padding: "50px 20px 20px",
    marginTop: "60px",
  },
  copyright: {
    textAlign: "center",
    paddingTop: "40px",
    marginTop: "40px",
    borderTop: "1px solid #333",
  },
};

export default Home;
