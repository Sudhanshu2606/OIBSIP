# README.md File - Complete Guide for OIBSIP Repository

```bash
cd C:\Users\sudha\pizza-delivery-app
code README.md
```

**Yeh poora code copy-paste karo:**

```markdown
# 🍕 PizzaExpress - Full Stack Pizza Delivery Application

A complete full-stack pizza delivery web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include user authentication, custom pizza builder, cart system, order tracking, admin panel, inventory management, Razorpay payment integration, and email notifications.

## 📋 Project Overview

PizzaExpress is a fully functional e-commerce platform for pizza delivery where users can:
- Create custom pizzas with various bases, sauces, cheeses, veggies, and meats
- Add items to cart and checkout securely
- Track orders in real-time
- Receive email notifications for order status updates
- Manage inventory (Admin)
- Update order status (Admin)
- Receive low stock alerts via email (Admin)

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://pizza-express.vercel.app |
| Backend API (Render) | https://pizza-express-api.onrender.com |
| GitHub Repository | https://github.com/YOUR_USERNAME/OIBSIP |

## ✨ Features

### User Features
- ✅ User Registration & Login with JWT
- ✅ Email Verification
- ✅ Forgot Password / Reset Password
- ✅ Custom Pizza Builder (5 Bases, 5 Sauces, 4 Cheeses, 8 Veggies, 5 Meats)
- ✅ Add to Cart Functionality
- ✅ Secure Checkout with Razorpay
- ✅ Order History
- ✅ Real-time Order Tracking
- ✅ Email Notifications for Order Status

### Admin Features
- ✅ Admin Dashboard
- ✅ Inventory Management (Base, Sauce, Cheese, Veggies, Meat)
- ✅ View All Orders
- ✅ Update Order Status (Received → In Kitchen → Out for Delivery → Delivered)
- ✅ Low Stock Email Alerts
- ✅ Automatic Stock Update After Orders

### Technical Features
- ✅ RESTful API Architecture
- ✅ JWT Authentication
- ✅ MongoDB Database
- ✅ Responsive UI with Bootstrap 5
- ✅ Real-time Order Status Updates
- ✅ Email Service (Nodemailer)
- ✅ Payment Integration (Razorpay Test Mode)

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Bootstrap 5 | Styling & Components |
| React Router DOM | Navigation |
| Axios | API Calls |
| React Hot Toast | Notifications |
| React Bootstrap | UI Components |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcryptjs | Password Hashing |
| Nodemailer | Email Service |
| Razorpay | Payment Gateway |
| Nodemon | Development Server |

## 📁 Project Structure

```
OIBSIP/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Inventory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── orders.js
│   │   ├── inventory.js
│   │   └── payment.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── emailService.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CustomizePizza.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── TrackOrder.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Offers.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   └── images/
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/OIBSIP.git
cd OIBSIP
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/pizza-delivery
JWT_SECRET=your_super_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
FRONTEND_URL=http://localhost:5173
```

Start backend server:

```bash
npm run dev
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in frontend folder:

```env
VITE_API_URL=http://localhost:5001
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

Start frontend server:

```bash
npm run dev
```

### Step 4: Initialize Database

Create admin user:

```bash
cd backend
node
```

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/pizza-delivery');

const userSchema = new mongoose.Schema({
  name: String, email: String, password: String, role: String, isVerified: Boolean
});
const User = mongoose.model('User', userSchema);

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = new User({
    name: 'Admin User',
    email: 'admin@pizza.com',
    password: hashedPassword,
    role: 'admin',
    isVerified: true
  });
  await admin.save();
  console.log('✅ Admin created! Email: admin@pizza.com, Password: admin123');
  mongoose.disconnect();
}
createAdmin();
```

Initialize inventory:

```bash
node init-inventory.js
```

### Step 5: Access the Application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`
- Admin Login: `admin@pizza.com` / `admin123`

## 🧪 Test Credentials

### User Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pizza.com | admin123 |
| User | test@user.com | test123 |

### Razorpay Test Card Details
```
Card Number: 4111 1111 1111 1111
Expiry: 12/28 (any future date)
CVV: 111
OTP: 111111 (6 digits)
```

## 📦 Deployment Guide

### Option 1: Deploy on Vercel )

#### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/OIBSIP.git
git push -u origin main
```

#### Step 2: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import `OIBSIP` repository
5. **Root Directory:** `frontend`
6. **Framework Preset:** Vite
7. Add Environment Variables:
   - `VITE_API_URL` = Your backend URL
   - `VITE_RAZORPAY_KEY_ID` = Your Razorpay key
8. Click "Deploy"

#### Step 3: Deploy Backend on Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. **Root Directory:** `backend`
6. **Build Command:** `npm install`
7. **Start Command:** `node server.js`
8. Add Environment Variables (from `.env` file)
9. Click "Create Web Service"


## 🔧 Environment Variables Reference

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/pizza-delivery
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_APP_NAME=PizzaExpress
```

## 📱 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User Registration |
| POST | `/api/auth/login` | User Login |
| POST | `/api/auth/forgot-password` | Forgot Password |
| POST | `/api/auth/reset-password/:token` | Reset Password |
| GET | `/api/inventory` | Get Inventory |
| POST | `/api/inventory/initialize` | Initialize Inventory (Admin) |
| GET | `/api/orders/my-orders` | Get User Orders |
| GET | `/api/orders/all` | Get All Orders (Admin) |
| PUT | `/api/orders/:orderId/status` | Update Order Status (Admin) |
| POST | `/api/payment/create-order` | Create Razorpay Order |

## 🎯 Features in Detail

### Custom Pizza Builder
- 5 Pizza Bases (Thin Crust, Cheese Burst, Pan Crust, Whole Wheat)
- 5 Sauces (Marinara, BBQ, Pesto, Alfredo)
- 4 Cheeses (Mozzarella, Cheddar, Parmesan, Vegan)
- 8 Veggies (Bell Peppers, Onions, Mushrooms, Olives, Jalapenos, Corn, etc.)
- 5 Meats (Pepperoni, Chicken, Sausage, Bacon)

### Admin Dashboard
- Real-time order management
- Inventory tracking with stock levels
- Low stock alerts via email
- Order status updates with email notifications to users

### Order Tracking
- Real-time order status (Confirmed → Preparing → Out for Delivery → Delivered)
- Email notifications on status change
- Order history with all details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sudhanshu Chourasiya**
- GitHub: [@sudhanshu2606](https://github.com/Sudhanshu2606)

## 🙏 Acknowledgments

- Razorpay for payment gateway
- Unsplash & Pixabay for images
- Bootstrap for UI components
- MongoDB for database

## 📞 Support

For support, email: sudhanshuchourasiya26052005@gmail.com

---

## 🚀 Quick Deployment Commands

```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Build frontend
cd frontend
npm run build

# Deploy to Vercel
npx vercel --prod
```

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] Razorpay test keys added
- [ ] Email service configured
- [ ] Test order placed successfully
- [ ] Admin panel accessible

---

**🍕 Made with love for pizza lovers!**
```

## Step 2: Push to GitHub

```bash
cd C:\Users\sudha\pizza-delivery-app
git add README.md
git commit -m "Add comprehensive README file"
git push origin main
```

## Step 3: Repository Name Change Karo

```bash
# GitHub pe repository rename karo
# Ya phir naya repository banao "OIBSIP"
```

**Naya repository banao:**

1. GitHub pe **"New Repository"** click karo
2. Name: `OIBSIP`
3. Create karo

**Code push karo naye repo mein:**

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/OIBSIP.git
git push -u origin main
```

**README file ab complete hai!** 📄✅