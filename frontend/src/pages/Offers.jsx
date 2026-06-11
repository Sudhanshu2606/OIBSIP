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
} from "react-bootstrap";

function Offers() {
  const navigate = useNavigate();

  const offers = [
    {
      id: 1,
      title: "50% OFF",
      desc: "On your first order",
      code: "FIRST50",
      icon: "🎉",
      color: "danger",
      valid: "Today Only",
    },
    {
      id: 2,
      title: "Free Delivery",
      desc: "Above ₹499",
      code: "FREEDEL",
      icon: "🚚",
      color: "success",
      valid: "Limited Period",
    },
    {
      id: 3,
      title: "Combo Deal",
      desc: "Pizza + Drink + Fries",
      price: "₹399",
      original: "₹599",
      icon: "🍕🥤🍟",
      color: "warning",
      valid: "Limited Time",
    },
    {
      id: 4,
      title: "Family Pack",
      desc: "2 Large Pizzas + 2 Sides",
      price: "₹899",
      original: "₹1299",
      icon: "👨‍👩‍👧‍👦",
      color: "info",
      valid: "Weekend Special",
    },
  ];

  return (
    <div>
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
              <Nav.Link onClick={() => navigate("/menu")}>MENU</Nav.Link>
              <Nav.Link
                onClick={() => navigate("/offers")}
                className="fw-bold text-danger"
              >
                OFFERS
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/track-order")}>
                TRACK ORDER
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")}>CONTACT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          background: "#e31837",
          color: "white",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold">🔥 Hot Deals & Offers</h1>
          <p className="lead">Grab these amazing offers before they expire!</p>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="g-4">
          {offers.map((offer) => (
            <Col md={3} key={offer.id}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body className="p-4">
                  <div className="display-1 mb-3">{offer.icon}</div>
                  <Card.Title className={`text-${offer.color} fw-bold`}>
                    {offer.title}
                  </Card.Title>
                  <Card.Text>{offer.desc}</Card.Text>
                  {offer.price && (
                    <h4 className="text-danger">
                      {offer.price}{" "}
                      <span className="text-decoration-line-through text-muted fs-6">
                        {offer.original}
                      </span>
                    </h4>
                  )}
                  {offer.code && (
                    <Badge bg={offer.color} className="mb-2 p-2">
                      Use Code: {offer.code}
                    </Badge>
                  )}
                  <Badge bg="secondary" className="mb-3">
                    {offer.valid}
                  </Badge>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => navigate("/customize")}
                  >
                    Grab Deal →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="bg-dark text-white-50 py-4 text-center">
        <Container>
          <p>© 2024 PIZZAEXPRESS - All rights reserved</p>
        </Container>
      </footer>
    </div>
  );
}

export default Offers;
