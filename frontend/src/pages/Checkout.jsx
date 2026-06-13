import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill all delivery details");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_Szf2yhzNL0P3Wp",
      amount: cartTotal * 100,
      currency: "INR",
      name: "PIZZAEXPRESS",
      description: "Pizza Order Payment",
      image:
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg",
      // This enables UPI and Indian cards
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
      handler: function (response) {
        const orderId =
          "ORD" + Math.random().toString(36).substr(2, 8).toUpperCase();
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.unshift({
          id: orderId,
          items: cartItems,
          total: cartTotal,
          date: new Date().toISOString(),
          status: "confirmed",
          paymentId: response.razorpay_payment_id,
          deliveryAddress: formData,
        });
        localStorage.setItem("orders", JSON.stringify(orders));
        clearCart();
        toast.success("🎉 Payment Successful! Order placed!");
        navigate(`/track-order/${orderId}`);
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
          setLoading(false);
        },
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      },
      theme: {
        color: "#e31837",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false);
  };

  // Direct COD Order
  const handleCODOrder = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill all delivery details");
      return;
    }

    setLoading(true);
    const orderId =
      "COD" + Math.random().toString(36).substr(2, 8).toUpperCase();
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.unshift({
      id: orderId,
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
      status: "confirmed",
      deliveryAddress: formData,
      paymentMethod: "Cash on Delivery",
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    clearCart();
    toast.success("✅ Order placed! Pay when pizza arrives (COD)");
    navigate(`/track-order/${orderId}`);
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div>
      <div
        style={{ background: "#e31837", color: "white", padding: "15px 30px" }}
      >
        <button
          onClick={() => navigate("/cart")}
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
          ← Back to Cart
        </button>
        <h2 style={{ display: "inline-block" }}>📋 Checkout</h2>
      </div>

      <Container className="my-5">
        <Row>
          <Col md={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Delivery Details</h4>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          onChange={handleChange}
                          value={formData.name}
                          placeholder="Enter your full name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          required
                          onChange={handleChange}
                          value={formData.email}
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          required
                          onChange={handleChange}
                          value={formData.phone}
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Pincode *</Form.Label>
                        <Form.Control
                          type="text"
                          name="pincode"
                          required
                          onChange={handleChange}
                          value={formData.pincode}
                          placeholder="Enter pincode"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="address"
                          required
                          onChange={handleChange}
                          value={formData.address}
                          placeholder="Enter your full address"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          required
                          onChange={handleChange}
                          value={formData.city}
                          placeholder="Enter city"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Payment Options */}
                  <Card className="mb-3 bg-light">
                    <Card.Body>
                      <h6>💳 Payment Options</h6>
                      <div className="d-flex gap-3 flex-wrap">
                        <span className="badge bg-primary p-2">
                          💳 Credit/Debit Card
                        </span>
                        <span className="badge bg-success p-2">
                          📱 UPI (Google Pay, PhonePe)
                        </span>
                        <span className="badge bg-info p-2">🏦 Netbanking</span>
                        <span className="badge bg-warning p-2">
                          💵 Cash on Delivery
                        </span>
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Domestic Test Card Details */}
                  <Card className="mb-3 bg-secondary bg-opacity-10">
                    <Card.Body>
                      <h6>🧪 Test Payment Details (Razorpay Test Mode)</h6>
                      <small>
                        <strong>Domestic Card:</strong> 4111 1111 1111 1111
                        <br />
                        <strong>Expiry:</strong> 12/28 | <strong>CVV:</strong>{" "}
                        111 | <strong>OTP:</strong> 1111
                        <br />
                        <strong>UPI Test ID:</strong> success@razorpay (OTP:
                        1111)
                        <br />
                        <strong>Netbanking:</strong> Select any bank → Login
                        with "test" → OTP: 1111
                      </small>
                    </Card.Body>
                  </Card>

                  <Button
                    variant="danger"
                    size="lg"
                    className="w-100 mb-2"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : `💳 Pay ₹${cartTotal} (Card/UPI/Netbanking)`}
                  </Button>

                  <Button
                    variant="success"
                    size="lg"
                    className="w-100"
                    onClick={handleCODOrder}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : `💵 Place COD Order • ₹${cartTotal}`}
                  </Button>

                  <p className="text-center text-muted mt-3 small">
                    🔒 Secure payment via Razorpay | Test mode only
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Order Summary</h4>
                <hr />
                {cartItems.map((item, i) => (
                  <div key={i} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total Amount</strong>
                  <strong className="text-danger h4">₹{cartTotal}</strong>
                </div>
                <hr />
                <small className="text-muted">
                  ✅ Free Delivery above ₹499
                </small>
                <hr />
                <small className="text-muted">
                  🚚 Estimated Delivery: 30-40 mins
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;
