import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <div
          style={{
            background: "#e31837",
            color: "white",
            padding: "15px 30px",
          }}
        >
          <h2>🛒 Your Cart</h2>
        </div>
        <Container className="my-5 text-center">
          <div style={{ fontSize: "80px" }}>🛒</div>
          <h3>Your cart is empty!</h3>
          <p>Add some delicious pizzas to your cart</p>
          <Button variant="danger" onClick={() => navigate("/customize")}>
            Order Now
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{ background: "#e31837", color: "white", padding: "15px 30px" }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "white",
            color: "#e31837",
            border: "none",
            padding: "8px 20px",
            borderRadius: "5px",
            marginRight: "20px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <h2 style={{ display: "inline-block" }}>
          🛒 Your Cart ({cartItems.length} items)
        </h2>
      </div>

      <Container className="my-5">
        <Row>
          <Col md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <h4>{item.name}</h4>
                      <p className="text-muted">{item.desc}</p>
                      <p className="text-danger fw-bold">₹{item.price}</p>
                    </Col>
                    <Col md={4}>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="fw-bold mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="ms-3"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <p className="mt-2 fw-bold">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Order Summary</h4>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items:</span>
                  <strong>
                    {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Amount:</span>
                  <strong className="text-danger h4">₹{cartTotal}</strong>
                </div>
                <Button
                  variant="danger"
                  size="lg"
                  className="w-100 mb-2"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout →
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
