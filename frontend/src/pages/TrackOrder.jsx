import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, ProgressBar, Badge } from "react-bootstrap";

function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState(0);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      const statusMap = {
        confirmed: 0,
        preparing: 1,
        out_for_delivery: 2,
        delivered: 3,
      };
      setTrackingStatus(statusMap[foundOrder.status] || 0);
    }
  }, [orderId]);

  const statusSteps = [
    { label: "Order Confirmed", icon: "✅", color: "#ffc107" },
    { label: "Preparing Your Pizza", icon: "🍕", color: "#17a2b8" },
    { label: "Out for Delivery", icon: "🚚", color: "#fd7e14" },
    { label: "Delivered", icon: "🏠", color: "#28a745" },
  ];

  if (!order) {
    return (
      <Container className="text-center my-5">
        <div
          style={{
            background: "#e31837",
            color: "white",
            padding: "15px 30px",
            marginBottom: "30px",
          }}
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
          <h2 style={{ display: "inline-block" }}>📍 Track Your Order</h2>
        </div>
        <Card className="shadow-sm p-5">
          <h3>Order not found!</h3>
          <p>Please check your order ID or go back to dashboard.</p>
          <Button variant="danger" onClick={() => navigate("/dashboard")}>
            Back to Home
          </Button>
        </Card>
      </Container>
    );
  }

  const progressPercent = (trackingStatus / 3) * 100;

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
        <h2 style={{ display: "inline-block" }}>📍 Track Your Order</h2>
      </div>

      <Container className="my-5">
        {/* Order Details Card */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h3>Order #{order.id}</h3>
            <p>Placed on: {new Date(order.date).toLocaleString()}</p>
            <p>Payment ID: {order.paymentId || "N/A"}</p>
            <p>
              Total Amount:{" "}
              <strong className="text-danger">₹{order.total}</strong>
            </p>
          </Card.Body>
        </Card>

        {/* Tracking Progress Card */}
        <Card className="shadow-sm">
          <Card.Body>
            <h4 className="mb-4">Order Status</h4>
            <ProgressBar
              now={progressPercent}
              className="mb-4"
              style={{ height: "10px" }}
            />
            <div className="d-flex justify-content-between">
              {statusSteps.map((step, index) => (
                <div key={index} className="text-center" style={{ flex: 1 }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background:
                        index <= trackingStatus ? step.color : "#e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      fontSize: "24px",
                    }}
                  >
                    {step.icon}
                  </div>
                  <strong style={{ fontSize: "12px" }}>{step.label}</strong>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Badge
                bg={trackingStatus === 3 ? "success" : "warning"}
                className="p-2"
              >
                {trackingStatus === 3
                  ? "Order Delivered ✓"
                  : "Order in Progress..."}
              </Badge>
            </div>
          </Card.Body>
        </Card>

        {/* Order Items Card */}
        <Card className="shadow-sm mt-4">
          <Card.Body>
            <h4>Order Items</h4>
            <hr />
            {order.items.map((item, i) => (
              <div key={i} className="d-flex justify-content-between mb-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong className="text-danger">₹{order.total}</strong>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default TrackOrder;
