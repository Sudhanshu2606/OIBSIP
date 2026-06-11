import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  Navbar,
  Nav,
  Alert,
} from "react-bootstrap";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [lowStockAlert, setLowStockAlert] = useState([]);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5001";

  useEffect(() => {
    fetchOrders();
    fetchInventory();
    const interval = setInterval(() => {
      fetchOrders();
      fetchInventory();
    }, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/inventory`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const invMap = {};
      const lowItems = [];
      res.data.forEach((cat) => {
        invMap[cat.category] = cat.items;
        cat.items.forEach((item) => {
          if (item.stock <= item.threshold) {
            lowItems.push({ category: cat.category, ...item });
          }
        });
      });
      setInventory(invMap);
      setLowStockAlert(lowItems);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
      setShowModal(false);
    } catch (err) {
      toast.error("Error updating order status");
    }
  };

  const updateInventory = async (category, items) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/inventory/${category}`,
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success(`${category} inventory updated`);
      fetchInventory();
    } catch (err) {
      toast.error("Error updating inventory");
    }
  };

  const initializeInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/inventory/initialize`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Inventory initialized");
      fetchInventory();
    } catch (err) {
      toast.error("Error initializing inventory");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      received: "warning",
      "in-kitchen": "info",
      "out-for-delivery": "primary",
      delivered: "success",
    };
    return colors[status] || "secondary";
  };

  const getStatusText = (status) => {
    const texts = {
      received: "Order Received",
      "in-kitchen": "In Kitchen",
      "out-for-delivery": "Out for Delivery",
      delivered: "Delivered",
    };
    return texts[status] || status;
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="sticky-top">
        <Container>
          <Navbar.Brand>🍕 PizzaExpress - Admin Panel</Navbar.Brand>
          <div className="ms-auto">
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Go to User Dashboard
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Low Stock Alert Banner */}
      {lowStockAlert.length > 0 && (
        <Alert variant="danger" className="mb-0 rounded-0">
          <Alert.Heading>⚠️ Low Stock Alert!</Alert.Heading>
          <p>The following items are below threshold and need restocking:</p>
          <ul>
            {lowStockAlert.map((item, i) => (
              <li key={i}>
                <strong>{item.name}</strong> - Only {item.stock} left
                (Threshold: {item.threshold})
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <Container className="my-4">
        {/* Tabs */}
        <div className="d-flex gap-3 mb-4 border-bottom pb-2">
          <button
            className={`btn ${activeTab === "orders" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => setActiveTab("orders")}
          >
            📋 Orders ({orders.length})
          </button>
          <button
            className={`btn ${activeTab === "inventory" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => setActiveTab("inventory")}
          >
            📦 Inventory Management
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <>
            <h3 className="mb-4">📋 All Orders</h3>
            {orders.length === 0 ? (
              <Card className="text-center p-5">
                <p>No orders yet</p>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order._id} className="mb-3 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <h6 className="mb-1">Order #{order._id.slice(-8)}</h6>
                        <small className="text-muted">
                          {new Date(order.createdAt).toLocaleString()}
                        </small>
                        <p className="mb-0 mt-1">
                          <strong>{order.user?.name}</strong>
                          <br />
                          {order.user?.email}
                        </p>
                      </Col>
                      <Col md={4}>
                        <p className="mb-1">
                          <strong>Pizza:</strong> {order.pizza?.base} •{" "}
                          {order.pizza?.sauce} • {order.pizza?.cheese}
                        </p>
                        <p className="mb-0">
                          <strong>Veggies:</strong>{" "}
                          {order.pizza?.veggies?.join(", ")}
                        </p>
                        {order.pizza?.meat && (
                          <p className="mb-0">
                            <strong>Meat:</strong> {order.pizza?.meat}
                          </p>
                        )}
                      </Col>
                      <Col md={2}>
                        <h4 className="text-danger mb-0">
                          ₹{order.totalAmount}
                        </h4>
                      </Col>
                      <Col md={3}>
                        <Badge
                          bg={getStatusColor(order.status)}
                          className="fs-6 p-2 mb-2 d-inline-block"
                        >
                          {getStatusText(order.status)}
                        </Badge>
                        <Button
                          variant="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                        >
                          Update Status
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            )}
          </>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>📦 Inventory Management</h3>
              <Button variant="danger" onClick={initializeInventory}>
                🔄 Initialize Default Inventory
              </Button>
            </div>

            {["base", "sauce", "cheese", "veggie", "meat"].map((category) => (
              <Card key={category} className="mb-4 shadow-sm">
                <Card.Header className="bg-danger text-white fw-bold">
                  {category.toUpperCase()} ({inventory[category]?.length || 0}{" "}
                  items)
                </Card.Header>
                <Card.Body>
                  <Table responsive striped hover>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Current Stock</th>
                        <th>Threshold</th>
                        <th>Price (₹)</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory[category]?.map((item, idx) => (
                        <tr
                          key={item.name}
                          style={{
                            backgroundColor:
                              item.stock <= item.threshold
                                ? "#ffebee"
                                : "white",
                          }}
                        >
                          <td>{item.name}</td>
                          <td>
                            <input
                              type="number"
                              value={item.stock}
                              onChange={(e) => {
                                const newItems = [...inventory[category]];
                                newItems[idx].stock = parseInt(e.target.value);
                                setInventory({
                                  ...inventory,
                                  [category]: newItems,
                                });
                              }}
                              style={{
                                width: "80px",
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.threshold}
                              onChange={(e) => {
                                const newItems = [...inventory[category]];
                                newItems[idx].threshold = parseInt(
                                  e.target.value,
                                );
                                setInventory({
                                  ...inventory,
                                  [category]: newItems,
                                });
                              }}
                              style={{
                                width: "80px",
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.5"
                              value={item.price}
                              onChange={(e) => {
                                const newItems = [...inventory[category]];
                                newItems[idx].price = parseFloat(
                                  e.target.value,
                                );
                                setInventory({
                                  ...inventory,
                                  [category]: newItems,
                                });
                              }}
                              style={{
                                width: "80px",
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                              }}
                            />
                          </td>
                          <td>
                            {item.stock <= item.threshold ? (
                              <Badge bg="danger">⚠️ Low Stock</Badge>
                            ) : (
                              <Badge bg="success">✅ In Stock</Badge>
                            )}
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() =>
                                updateInventory(category, inventory[category])
                              }
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </Container>

      {/* Update Status Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Order ID:</strong> {selectedOrder?._id?.slice(-8)}
          </p>
          <p>
            <strong>Current Status:</strong>{" "}
            <Badge bg={getStatusColor(selectedOrder?.status)}>
              {getStatusText(selectedOrder?.status)}
            </Badge>
          </p>
          <hr />
          <div className="d-grid gap-2">
            {["received", "in-kitchen", "out-for-delivery", "delivered"].map(
              (status) => (
                <Button
                  key={status}
                  variant={
                    selectedOrder?.status === status
                      ? "danger"
                      : "outline-danger"
                  }
                  onClick={() => updateOrderStatus(selectedOrder?._id, status)}
                  disabled={selectedOrder?.status === status}
                >
                  {getStatusText(status)}
                </Button>
              ),
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
