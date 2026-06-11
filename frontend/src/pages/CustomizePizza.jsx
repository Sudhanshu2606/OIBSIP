import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
} from "react-bootstrap";

function CustomizePizza() {
  const [step, setStep] = useState(1);
  const [inventory, setInventory] = useState({});
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState(null);
  const [totalPrice, setTotalPrice] = useState(199);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // Pizza bases with images
  const bases = [
    {
      id: 1,
      name: "Thin Crust",
      price: 199,
      image: "/images/thin-crust.jpg",
      desc: "Crispy & Light",
    },
    {
      id: 2,
      name: "Cheese Burst",
      price: 299,
      image: "/images/cheese-burst.jpg",
      desc: "Extra Cheesy",
    },
    {
      id: 3,
      name: "Pan Crust",
      price: 249,
      image: "/images/pan-crust.jpg",
      desc: "Soft & Fluffy",
    },
    {
      id: 4,
      name: "Whole Wheat",
      price: 229,
      image: "/images/whole-wheat.jpg",
      desc: "Healthy Option",
    },
  ];

  // Sauces
  const sauces = [
    {
      id: 1,
      name: "Marinara",
      price: 0,
      image: "/images/marinara.jpg",
      desc: "Classic Tomato",
    },
    {
      id: 2,
      name: "BBQ",
      price: 50,
      image: "/images/bbq.jpg",
      desc: "Smoky & Sweet",
    },
    {
      id: 3,
      name: "Pesto",
      price: 50,
      image: "/images/pesto.jpg",
      desc: "Fresh Basil",
    },
    {
      id: 4,
      name: "Alfredo",
      price: 50,
      image: "/images/alfredo.jpg",
      desc: "Creamy & Rich",
    },
  ];

  // Cheeses
  const cheeses = [
    {
      id: 1,
      name: "Mozzarella",
      price: 0,
      image: "/images/mozzarella.jpg",
      desc: "Classic",
    },
    {
      id: 2,
      name: "Cheddar",
      price: 50,
      image: "/images/cheddar.jpg",
      desc: "Sharp & Tangy",
    },
    {
      id: 3,
      name: "Parmesan",
      price: 50,
      image: "/images/parmesan.jpg",
      desc: "Nutty Flavor",
    },
    {
      id: 4,
      name: "Vegan Cheese",
      price: 80,
      image: "/images/vegan-cheese.jpg",
      desc: "Plant Based",
    },
  ];

  // Veggies
  const veggies = [
    {
      id: 1,
      name: "Bell Peppers",
      price: 30,
      image: "/images/bell-peppers.jpg",
    },
    { id: 2, name: "Onions", price: 20, image: "/images/onions.jpg" },
    { id: 3, name: "Mushrooms", price: 40, image: "/images/mushrooms.jpg" },
    { id: 4, name: "Olives", price: 35, image: "/images/olives.jpg" },
    { id: 5, name: "Jalapenos", price: 30, image: "/images/jalapenos.jpg" },
    { id: 6, name: "Corn", price: 25, image: "/images/corn.jpg" },
  ];

  // Meats
  const meats = [
    { id: 1, name: "Pepperoni", price: 80, image: "/images/pepperoni.jpg" },
    { id: 2, name: "Chicken", price: 90, image: "/images/chicken.jpg" },
    { id: 3, name: "Sausage", price: 80, image: "/images/sausage.jpg" },
    { id: 4, name: "Bacon", price: 100, image: "/images/bacon.jpg" },
  ];

  const calculateTotal = () => {
    let price =
      (selectedBase?.price || 0) +
      (selectedSauce?.price || 0) +
      (selectedCheese?.price || 0);
    selectedVeggies.forEach((v) => (price += v.price));
    if (selectedMeat) price += selectedMeat.price;
    setTotalPrice(price);
  };

  useEffect(() => {
    calculateTotal();
  }, [
    selectedBase,
    selectedSauce,
    selectedCheese,
    selectedVeggies,
    selectedMeat,
  ]);

  const handleAddToCart = () => {
    if (!selectedBase || !selectedSauce || !selectedCheese) {
      toast.error("Please complete all steps first!");
      return;
    }

    const pizza = {
      id: Date.now(),
      name: `${selectedBase.name} Pizza`,
      desc: `${selectedSauce.name} sauce, ${selectedCheese.name} cheese${selectedVeggies.length > 0 ? `, ${selectedVeggies.map((v) => v.name).join(", ")}` : ""}${selectedMeat ? `, ${selectedMeat.name}` : ""}`,
      price: totalPrice,
      image: selectedBase.image,
      quantity: 1,
      base: selectedBase.name,
      sauce: selectedSauce.name,
      cheese: selectedCheese.name,
      veggies: selectedVeggies.map((v) => v.name),
      meat: selectedMeat?.name,
    };

    addToCart(pizza);
    toast.success("Pizza added to cart! 🍕");
    navigate("/cart");
  };

  const progress = (step / 6) * 100;

  return (
    <div>
      {/* Header */}
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
        <h2 style={{ display: "inline-block" }}>🍕 Customize Your Pizza</h2>
      </div>

      <Container className="my-5">
        {/* Progress Bar */}
        <div className="mb-5">
          <div className="d-flex justify-content-between mb-2">
            <span className={step >= 1 ? "text-danger fw-bold" : "text-muted"}>
              Base
            </span>
            <span className={step >= 2 ? "text-danger fw-bold" : "text-muted"}>
              Sauce
            </span>
            <span className={step >= 3 ? "text-danger fw-bold" : "text-muted"}>
              Cheese
            </span>
            <span className={step >= 4 ? "text-danger fw-bold" : "text-muted"}>
              Veggies
            </span>
            <span className={step >= 5 ? "text-danger fw-bold" : "text-muted"}>
              Meat
            </span>
            <span className={step >= 6 ? "text-danger fw-bold" : "text-muted"}>
              Review
            </span>
          </div>
          <ProgressBar
            now={progress}
            variant="danger"
            style={{ height: "8px" }}
          />
        </div>

        {/* Step 1 - Base */}
        {step === 1 && (
          <>
            <h2 className="text-center mb-4">Choose Your Pizza Base</h2>
            <Row className="g-4">
              {bases.map((base) => (
                <Col md={3} key={base.id}>
                  <Card
                    className="h-100 shadow-sm border-0 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedBase(base);
                      setStep(2);
                    }}
                  >
                    <div style={{ height: "180px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={base.image}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{base.name}</Card.Title>
                      <Card.Text className="text-muted">{base.desc}</Card.Text>
                      <h5 className="text-danger">₹{base.price}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Step 2 - Sauce */}
        {step === 2 && (
          <>
            <h2 className="text-center mb-4">Choose Your Sauce</h2>
            <Row className="g-4">
              {sauces.map((sauce) => (
                <Col md={3} key={sauce.id}>
                  <Card
                    className="h-100 shadow-sm border-0 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedSauce(sauce);
                      setStep(3);
                    }}
                  >
                    <div style={{ height: "180px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={sauce.image}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{sauce.name}</Card.Title>
                      <Card.Text className="text-muted">{sauce.desc}</Card.Text>
                      <h5 className="text-danger">₹{sauce.price}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Step 3 - Cheese */}
        {step === 3 && (
          <>
            <h2 className="text-center mb-4">Choose Your Cheese</h2>
            <Row className="g-4">
              {cheeses.map((cheese) => (
                <Col md={3} key={cheese.id}>
                  <Card
                    className="h-100 shadow-sm border-0 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCheese(cheese);
                      setStep(4);
                    }}
                  >
                    <div style={{ height: "180px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={cheese.image}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{cheese.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {cheese.desc}
                      </Card.Text>
                      <h5 className="text-danger">₹{cheese.price}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Step 4 - Veggies */}
        {step === 4 && (
          <>
            <h2 className="text-center mb-4">
              Choose Your Veggies (Select Multiple)
            </h2>
            <Row className="g-4">
              {veggies.map((veggie) => (
                <Col md={4} key={veggie.id}>
                  <Card
                    className={`h-100 shadow-sm border-0 text-center ${selectedVeggies.includes(veggie) ? "border-danger border-2" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (selectedVeggies.includes(veggie)) {
                        setSelectedVeggies(
                          selectedVeggies.filter((v) => v !== veggie),
                        );
                      } else {
                        setSelectedVeggies([...selectedVeggies, veggie]);
                      }
                    }}
                  >
                    <div style={{ height: "160px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={veggie.image}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{veggie.name}</Card.Title>
                      <h5
                        className={`${selectedVeggies.includes(veggie) ? "text-danger" : "text-muted"}`}
                      >
                        ₹{veggie.price}
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Button variant="danger" size="lg" onClick={() => setStep(5)}>
                Continue →
              </Button>
            </div>
          </>
        )}

        {/* Step 5 - Meat */}
        {step === 5 && (
          <>
            <h2 className="text-center mb-4">Choose Meat (Optional)</h2>
            <Row className="g-4">
              <Col md={3}>
                <Card
                  className="h-100 shadow-sm border-0 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedMeat(null);
                    setStep(6);
                  }}
                >
                  <Card.Body>
                    <div style={{ fontSize: "60px" }}>🌱</div>
                    <Card.Title>No Meat</Card.Title>
                    <h5 className="text-success">₹0</h5>
                  </Card.Body>
                </Card>
              </Col>
              {meats.map((meat) => (
                <Col md={3} key={meat.id}>
                  <Card
                    className="h-100 shadow-sm border-0 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedMeat(meat);
                      setStep(6);
                    }}
                  >
                    <div style={{ height: "160px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={meat.image}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{meat.name}</Card.Title>
                      <h5 className="text-danger">₹{meat.price}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Step 6 - Review */}
        {step === 6 && (
          <>
            <h2 className="text-center mb-4">Review Your Pizza</h2>
            <Row>
              <Col md={8} className="mx-auto">
                <Card className="shadow-lg border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                      <span>🍕 Base:</span>
                      <strong>{selectedBase?.name}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                      <span>🥫 Sauce:</span>
                      <strong>{selectedSauce?.name}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                      <span>🧀 Cheese:</span>
                      <strong>{selectedCheese?.name}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                      <span>🌿 Veggies:</span>
                      <strong>
                        {selectedVeggies.map((v) => v.name).join(", ") ||
                          "None"}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                      <span>🍖 Meat:</span>
                      <strong>{selectedMeat?.name || "None"}</strong>
                    </div>
                    <div className="d-flex justify-content-between mt-3 pt-2">
                      <h4>Total Amount:</h4>
                      <h3 className="text-danger fw-bold">₹{totalPrice}</h3>
                    </div>
                  </Card.Body>
                </Card>
                <div className="text-center mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    className="me-3"
                    onClick={handleAddToCart}
                  >
                    🛒 Add to Cart • ₹{totalPrice}
                  </Button>
                  <Button variant="danger" size="lg" onClick={() => setStep(1)}>
                    Start Over
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default CustomizePizza;
