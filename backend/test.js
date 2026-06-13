const mongoose = require("mongoose");

async function testConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("✅ SUCCESS: MongoDB Connected!");
    console.log("Database:", mongoose.connection.name);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.log("❌ FAILED:", err.message);
    process.exit(1);
  }
}

testConnection();
