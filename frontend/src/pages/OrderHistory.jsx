import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Badge } from "react-bootstrap";

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

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
        <h2 style={{ display: "inline-block" }}>📋 Order History</h2>
      </div>

      <Container className="my-5">
        {orders.length === 0 ? (
          <Card className="text-center p-5">
            <div style={{ fontSize: "60px" }}>📦</div>
            <h3>No orders yet!</h3>
            <p>Your order history will appear here</p>
            <Button variant="danger" onClick={() => navigate("/customize")}>
              Order Now
            </Button>
          </Card>
        ) : (
          orders.map((order, index) => (
            <Card key={index} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="mb-1">Order #{order.id}</h5>
                    <small className="text-muted">
                      {new Date(order.date).toLocaleString()}
                    </small>
                  </div>
                  <Badge bg={getStatusBadge(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <hr />
                {order.items.map((item, i) => (
                  <div key={i} className="d-flex justify-content-between mb-1">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <strong>Total: ₹{order.total}</strong>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => navigate(`/track-order/${order.id}`)}
                  >
                    Track Order →
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}

export default OrderHistory;
