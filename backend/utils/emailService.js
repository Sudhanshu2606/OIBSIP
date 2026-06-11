const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Email Verification - Pizza Delivery App",
    html: `<h3>Verify your email</h3>
           <p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  });
};

const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Password Reset - Pizza Delivery App",
    html: `<h3>Reset your password</h3>
           <p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
  });
};

const sendStockAlertEmail = async (adminEmail, lowStockItems) => {
  const itemsList = lowStockItems
    .map(
      (item) =>
        `<li>${item.name}: Only ${item.stock} left (Threshold: ${item.threshold})</li>`,
    )
    .join("");

  await transporter.sendMail({
    to: adminEmail,
    subject: "⚠️ Low Stock Alert - Pizza Delivery App",
    html: `<h3>Low Stock Alert</h3>
           <p>The following items are below threshold:</p>
           <ul>${itemsList}</ul>
           <p>Please restock soon!</p>`,
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendStockAlertEmail,
};
