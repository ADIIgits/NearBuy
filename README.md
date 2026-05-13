# 🏪 NearBuy - Your Local Marketplace Connector

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React%2019-61dafb?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)

NearBuy is a sophisticated full-stack platform designed to empower local commerce. It connects customers with nearby vendors through a seamless, location-aware interface. Shop owners can digitize their inventory and manage orders in real-time, while customers can discover the best local deals without leaving their homes.

---

## ✨ Key Features

### 👤 For Customers
- **📍 Smart Geolocation**: Automatically detect and find shops in your immediate vicinity.
- **🔍 Seamless Discovery**: Browse shops by categories and view detailed product listings.
- **🛒 Effortless Ordering**: Place orders directly through the platform and track their status.
- **📱 Responsive UI**: Optimized experience for both desktop and mobile devices.

### 🏢 For Shop Owners
- **📊 Inventory Management**: Add, edit, or remove items with a powerful CRUD interface.
- **🔔 Order Dashboard**: Real-time tracking and management of incoming customer orders.
- **🗺️ Shop Presence**: Configure shop location, contact details, and operating status.
- **🔒 Secure Authentication**: Robust session-based auth system for data protection.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router 7
- **Data Fetching**: Axios
- **State Management**: React Context API

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express Session & BCryptJS
- **Middleware**: CORS, JSON Parser, Custom Middlewares

---

## 📁 Project Structure

```text
NearBuy/
├── Backend/                # Express.js Server
│   ├── src/
│   │   ├── controllers/    # Business logic for routes
│   │   ├── models/         # Mongoose schemas (User, Shop, Item, Order)
│   │   ├── routes/         # API endpoint definitions
│   │   ├── middlewares/    # Auth & validation logic
│   │   ├── db/             # Database connection setup
│   │   └── app.js          # Express app configuration
│   └── index.js            # Server entry point
├── Frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── pages/          # Main view components
│   │   ├── context/        # Global state (Auth, Cart, etc.)
│   │   ├── services/       # API service layers
│   │   └── assets/         # Static images and styles
│   └── index.html          # HTML entry point
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account or local instance

### 1. Clone the Repository
```bash
git clone https://github.com/ADIIgits/NearBuy.git
cd NearBuy
```

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` root:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_uri
   SESSION_SECRET=your_secure_session_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Configuration
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See `package.json` in the Backend folder for details.

---
Developed with passion by [ADIIgits](https://github.com/ADIIgits)
