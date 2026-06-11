import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";
import toast from "react-hot-toast";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We will contact you soon.");
    setFormData({ name: "", email: "", message: "" });
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
              <Nav.Link onClick={() => navigate("/menu")}>MENU</Nav.Link>
              <Nav.Link onClick={() => navigate("/offers")}>OFFERS</Nav.Link>
              <Nav.Link onClick={() => navigate("/track-order")}>
                TRACK ORDER
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/contact")}
                className="fw-bold text-danger"
              >
                CONTACT
              </Nav.Link>
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
          <h1 className="display-4 fw-bold">📞 Contact Us</h1>
          <p className="lead">We'd love to hear from you!</p>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="display-1 mb-3">📍</div>
                <Card.Title>Visit Us</Card.Title>
                <Card.Text>
                  123 Pizza Street
                  <br />
                  Foodie City, FC 12345
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="display-1 mb-3">📞</div>
                <Card.Title>Call Us</Card.Title>
                <Card.Text>
                  📞 1800-PIZZA-123
                  <br />
                  📞 +91 98765 43210
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="display-1 mb-3">✉️</div>
                <Card.Title>Email Us</Card.Title>
                <Card.Text>
                  order@pizzaexpress.com
                  <br />
                  support@pizzaexpress.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Send us a Message</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="danger"
                    size="lg"
                    className="w-100"
                  >
                    Send Message →
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
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

export default Contact;
