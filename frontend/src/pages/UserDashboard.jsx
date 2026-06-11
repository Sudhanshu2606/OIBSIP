import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Card,
  Carousel,
  Badge,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";

function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const API_URL = "http://localhost:5001";

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const sliderImages = [
    {
      image: "/images/margherita.jpg",
      title: "Margherita Pizza",
      desc: "Classic cheese & tomato",
      price: "₹299",
    },
    {
      image: "/images/pepperoni.jpg",
      title: "Pepperoni Pizza",
      desc: "Double pepperoni feast",
      price: "₹399",
    },
    {
      image: "/images/bbq-chicken.jpg",
      title: "BBQ Chicken Pizza",
      desc: "Grilled chicken in BBQ",
      price: "₹449",
    },
  ];

  const categories = [
    {
      name: "Veg Pizzas",
      image: "/images/veg-pizza.jpg",
      count: "12",
      color: "success",
      desc: "Fresh vegetable pizzas",
    },
    {
      name: "Non-Veg Pizzas",
      image: "/images/nonveg-pizza.jpg",
      count: "8",
      color: "danger",
      desc: "Chicken & pepperoni",
    },
    {
      name: "Pasta",
      image: "/images/pasta.jpg",
      count: "6",
      color: "warning",
      desc: "Creamy Italian pasta",
    },
    {
      name: "Sides",
      image: "/images/sides.jpg",
      count: "10",
      color: "info",
      desc: "Garlic bread & fries",
    },
  ];

  const popularPizzas = [
    {
      id: 1,
      name: "Margherita",
      price: 299,
      desc: "Fresh mozzarella, tomato sauce",
      image: "/images/margherita.jpg",
      rating: "4.8",
    },
    {
      id: 2,
      name: "Pepperoni",
      price: 399,
      desc: "Double pepperoni, mozzarella",
      image: "/images/pepperoni.jpg",
      rating: "4.9",
    },
    {
      id: 3,
      name: "Farmhouse",
      price: 349,
      desc: "Bell peppers, onions, mushrooms",
      image: "/images/farmhouse.jpg",
      rating: "4.7",
    },
    {
      id: 4,
      name: "BBQ Chicken",
      price: 449,
      desc: "Grilled chicken, BBQ sauce",
      image: "/images/bbq-chicken.jpg",
      rating: "4.9",
    },
    {
      id: 5,
      name: "Veg Supreme",
      price: 379,
      desc: "Corn, capsicum, onion, tomato",
      image: "/images/Veg Supreme.jpg",
      rating: "4.8",
    },
    {
      id: 6,
      name: "Cheese Lovers",
      price: 329,
      desc: "Extra mozzarella, cheddar",
      image: "/images/cheese-lovers.jpg",
      rating: "4.7",
    },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      confirmed: "warning",
      preparing: "info",
      out_for_delivery: "primary",
      delivered: "success",
    };
    return colors[status] || "secondary";
  };

  const getStatusText = (status) => {
    const texts = {
      confirmed: "Order Confirmed",
      preparing: "Preparing",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
    };
    return texts[status] || status;
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={{ background: "#e31837", color: "white", padding: "8px 0" }}>
        <Container>
          <Row className="text-center text-md-start">
            <Col md={6} className="text-md-start">
              <small>
                📞 1800-PIZZA-123 | ✉️ order@pizzaexpress.com | 🚚 Free Delivery
                Above ₹499
              </small>
            </Col>
            <Col md={6} className="text-md-end">
              <small>⭐ 4.8 Rating | ⏱️ 30 Min Delivery</small>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer", fontSize: "24px", fontWeight: "800" }}
          >
            PIZZA<span style={{ color: "#e31837" }}>EXPRESS</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link onClick={() => navigate("/dashboard")}>HOME</Nav.Link>
              <Nav.Link onClick={() => navigate("/customize")}>
                CUSTOM PIZZA
              </Nav.Link>

              {/* Menu Dropdown */}
              <NavDropdown title="📋 MENU" id="menu-dropdown">
                <NavDropdown.Item onClick={() => navigate("/customize")}>
                  🍕 Veg Pizzas
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/customize")}>
                  🍗 Non-Veg Pizzas
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/customize")}>
                  🍝 Pasta
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/customize")}>
                  🍟 Sides
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/menu")}>
                  View Full Menu
                </NavDropdown.Item>
              </NavDropdown>

              {/* Offers Dropdown */}
              <NavDropdown title="🔥 OFFERS" id="offers-dropdown">
                <NavDropdown.Item onClick={() => navigate("/offers")}>
                  50% OFF on First Order
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/offers")}>
                  Free Delivery Above ₹499
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/offers")}>
                  Combo Deals
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => navigate("/order-history")}>
                📋 MY ORDERS
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/track-order")}>
                📍 TRACK ORDER
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")}>
                📞 CONTACT
              </Nav.Link>
            </Nav>

            <div className="d-flex gap-2 align-items-center">
              {/* Cart Icon */}
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              >
                <span style={{ fontSize: "22px" }}>🛒</span>
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                    style={{ fontSize: "10px" }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>

              {/* User Dropdown */}
              <NavDropdown
                title={`👋 ${user?.name?.split(" ")[0]}`}
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={() => navigate("/dashboard")}>
                  My Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/order-history")}>
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} className="text-danger">
                  🚪 Logout
                </NavDropdown.Item>
              </NavDropdown>

              {/* Admin Panel Button - ONLY visible for admin users */}
              {user?.role === "admin" && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => navigate("/admin")}
                  className="fw-bold"
                >
                  👑 Admin Panel
                </Button>
              )}

              <Button
                variant="danger"
                size="sm"
                onClick={() => navigate("/customize")}
              >
                🍕 Order Now
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Carousel */}
      <Carousel interval={4000} className="mb-4">
        {sliderImages.map((slide, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                height: "500px",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
              }}
            >
              <div>
                <h1 className="display-3 fw-bold">{slide.title}</h1>
                <p className="lead">{slide.desc}</p>
                <h2 className="text-danger fw-bold mb-4">{slide.price}</h2>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => navigate("/customize")}
                >
                  Order Now →
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features */}
      <Container className="my-5">
        <Row className="g-4">
          <Col md={3}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <div className="display-1">🍕</div>
                <Card.Title>Fresh Pizzas</Card.Title>
                <Card.Text>Made with love daily</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <div className="display-1">⚡</div>
                <Card.Title>Fast Delivery</Card.Title>
                <Card.Text>30 minutes or free</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <div className="display-1">💰</div>
                <Card.Title>Best Price</Card.Title>
                <Card.Text>Starting ₹199</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <div className="display-1">🎁</div>
                <Card.Title>Free Gifts</Card.Title>
                <Card.Text>On every order</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Categories */}
      <Container className="my-5">
        <h2 className="text-center mb-5 display-5 fw-bold">
          🍽️ Explore Categories
        </h2>
        <Row className="g-4">
          {categories.map((cat, i) => (
            <Col md={3} key={i}>
              <Card
                className="border-0 shadow-sm h-100 overflow-hidden text-center"
                onClick={() => navigate("/customize")}
                style={{ cursor: "pointer" }}
              >
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={cat.image}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>
                  <Card.Text className="text-muted small">{cat.desc}</Card.Text>
                  <Badge bg={cat.color}>{cat.count} items</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Offer Banner */}
      <Container className="my-5">
        <div
          className="rounded-4 p-5 text-center text-white"
          style={{
            background: "linear-gradient(135deg, #e31837 0%, #ff6b35 100%)",
          }}
        >
          <h2 className="display-5 fw-bold mb-3">🎉 Limited Time Offer! 🎉</h2>
          <p className="lead mb-4">
            Get 50% OFF on your first order + Free Delivery
          </p>
          <Button
            variant="light"
            size="lg"
            className="text-danger fw-bold"
            onClick={() => navigate("/customize")}
          >
            Grab Offer →
          </Button>
        </div>
      </Container>

      {/* Popular Pizzas */}
      <Container className="my-5">
        <h2 className="text-center mb-5 display-5 fw-bold">
          🍕 MOST POPULAR PIZZAS
        </h2>
        <Row className="g-4">
          {popularPizzas.map((pizza, i) => (
            <Col md={4} key={i}>
              <Card
                className="border-0 shadow-sm h-100 overflow-hidden"
                onClick={() => navigate("/customize")}
                style={{ cursor: "pointer" }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={pizza.image}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0">{pizza.name}</Card.Title>
                    <Badge bg="warning" text="dark">
                      ⭐ {pizza.rating}
                    </Badge>
                  </div>
                  <Card.Text className="text-muted">{pizza.desc}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-danger fw-bold mb-0">₹{pizza.price}</h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => navigate("/customize")}
                    >
                      Order →
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Recent Orders Section */}
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="display-5 fw-bold mb-0">📋 YOUR RECENT ORDERS</h2>
          <Button
            variant="outline-danger"
            onClick={() => navigate("/order-history")}
          >
            View All →
          </Button>
        </div>
        {orders.length === 0 ? (
          <Card className="text-center p-5 bg-light border-0">
            <div className="display-1">🍕</div>
            <h3 className="mt-3">No orders yet!</h3>
            <p>Time to order your first delicious pizza from PIZZAEXPRESS</p>
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/customize")}
            >
              Order Now →
            </Button>
          </Card>
        ) : (
          orders.slice(0, 3).map((order, idx) => (
            <Card key={idx} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Order #{order.id}</h6>
                  <small className="text-muted">
                    {new Date(order.date).toLocaleDateString()}
                  </small>
                </div>
                <Badge bg={getStatusBadge(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
                <h5 className="text-danger fw-bold mb-0">₹{order.total}</h5>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => navigate(`/track-order/${order.id}`)}
                >
                  Track →
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white-50 mt-5 py-5">
        <Container>
          <Row className="g-4">
            <Col md={3}>
              <h5 className="text-white mb-3">PIZZAEXPRESS</h5>
              <p>Your favorite pizza destination since 2024</p>
            </Col>
            <Col md={3}>
              <h5 className="text-white mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="#"
                    onClick={() => navigate("/dashboard")}
                    className="text-white-50 text-decoration-none"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => navigate("/customize")}
                    className="text-white-50 text-decoration-none"
                  >
                    Custom Pizza
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => navigate("/order-history")}
                    className="text-white-50 text-decoration-none"
                  >
                    My Orders
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="text-white mb-3">Contact</h5>
              <p>📞 1800-PIZZA-123</p>
              <p>✉️ order@pizzaexpress.com</p>
            </Col>
            <Col md={3}>
              <h5 className="text-white mb-3">Follow Us</h5>
              <p>📱 Instagram | 📘 Facebook | 🐦 Twitter</p>
            </Col>
          </Row>
          <hr />
          <div className="text-center pt-3">
            <small>
              © 2024 PIZZAEXPRESS - All rights reserved | Crafted with 🍕 for
              pizza lovers
            </small>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default UserDashboard;
