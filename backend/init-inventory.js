const axios = require("axios");

async function initInventory() {
  try {
    console.log("Logging in as admin...");

    const loginRes = await axios.post("http://localhost:5001/api/auth/login", {
      email: "admin@pizza.com",
      password: "admin123",
    });

    const token = loginRes.data.token;
    console.log("✅ Logged in successfully");

    console.log("Initializing inventory...");
    const initRes = await axios.post(
      "http://localhost:5001/api/inventory/initialize",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log("✅ Inventory initialized successfully!");
    console.log("You can now start taking orders.");
  } catch (error) {
    console.log("❌ Error:", error.response?.data?.message || error.message);
  }
  process.exit();
}

initInventory();
