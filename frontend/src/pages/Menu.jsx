import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";

function Menu() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const menuItems = [
    {
      id: 1,
      name: "Margherita",
      price: 299,
      desc: "Fresh mozzarella, tomato sauce, basil",
      image: "/images/margherita.jpg",
      type: "veg",
      rating: "4.8",
      popular: true,
    },
    {
      id: 2,
      name: "Pepperoni",
      price: 399,
      desc: "Double pepperoni, mozzarella, oregano",
      image: "/images/pepperoni.jpg",
      type: "non-veg",
      rating: "4.9",
      popular: true,
    },
    {
      id: 3,
      name: "Farmhouse",
      price: 349,
      desc: "Bell peppers, onions, mushrooms, olives",
      image: "/images/farmhouse.jpg",
      type: "veg",
      rating: "4.7",
    },
    {
      id: 4,
      name: "BBQ Chicken",
      price: 449,
      desc: "Grilled chicken, BBQ sauce, red onions",
      image: "/images/bbq-chicken.jpg",
      type: "non-veg",
      rating: "4.9",
      popular: true,
    },
    {
      id: 5,
      name: "Veg Supreme",
      price: 379,
      desc: "Corn, capsicum, onion, tomato, mushroom",
      image: "/images/Veg Supreme.jpg",
      type: "veg",
      rating: "4.8",
    },
    {
      id: 6,
      name: "Cheese Lovers",
      price: 329,
      desc: "Extra mozzarella, cheddar, parmesan",
      image: "/images/cheese-lovers.jpg",
      type: "veg",
      rating: "4.7",
    },
  ];

  const handleAddToCart = (item) => {
    const pizza = {
      id: Date.now(),
      name: item.name,
      desc: item.desc,
      price: item.price,
      image: item.image,
      quantity: 1,
    };
    addToCart(pizza);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer", fontSize: "24px", fontWeight: "800" }}
          >
            PIZZA<span style={{ color: "#e31837" }}>EXPRESS</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto">
              <Nav.Link onClick={() => navigate("/dashboard")}>HOME</Nav.Link>
              <Nav.Link onClick={() => navigate("/customize")}>
                CUSTOM PIZZA
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/menu")}
                className="fw-bold text-danger"
              >
                MENU
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/offers")}>OFFERS</Nav.Link>
              <Nav.Link onClick={() => navigate("/track-order")}>
                TRACK ORDER
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")}>CONTACT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero */}
      <div
        style={{
          background: "#e31837",
          color: "white",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold">📋 Our Full Menu</h1>
          <p className="lead">Freshly made with love, delivered hot!</p>
        </Container>
      </div>

      {/* Menu Grid */}
      <Container className="my-5">
        <Row className="g-4">
          {menuItems.map((item) => (
            <Col md={4} key={item.id}>
              <Card className="h-100 shadow-sm border-0 overflow-hidden">
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0">{item.name}</Card.Title>
                    {item.popular && (
                      <Badge bg="warning" text="dark">
                        🔥 Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted small">{item.desc}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <Badge
                        bg={item.type === "veg" ? "success" : "danger"}
                        className="me-2"
                      >
                        {item.type === "veg" ? "🥬 Veg" : "🍗 Non-Veg"}
                      </Badge>
                      <Badge bg="warning" text="dark">
                        ⭐ {item.rating}
                      </Badge>
                    </div>
                    <h4 className="text-danger fw-bold mb-0">₹{item.price}</h4>
                  </div>
                  <Button
                    variant="danger"
                    className="w-100 mt-3"
                    onClick={() => handleAddToCart(item)}
                  >
                    🛒 Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4 text-center">
        <Container>
          <p>© 2024 PIZZAEXPRESS - All rights reserved</p>
        </Container>
      </footer>
    </div>
  );
}

export default Menu;
