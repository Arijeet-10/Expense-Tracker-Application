# 💰 Expense Tracker App

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive, fully responsive financial management application built using the MERN stack (MongoDB, Express, React, Node.js). Track your income and expenses with secure authentication, interactive visualizations, and data export capabilities.

## 📸 App Screenshots

<div align="center">


 <div style="display: flex; justify-content: space-between;">
    <div>
      <img src="https://github.com/user-attachments/assets/04b8f613-0c06-40d7-b49c-a2c990fa3262" width="380px" />
      <p><i>Dashboard interface</i></p>
    </div>
  </div>
  
  <br />

  <div style="display: flex; justify-content: space-between;">
    <div>
      <img src="https://github.com/user-attachments/assets/381a3f9e-7063-4ccd-a9ef-27db7fad491f" width="380px" />
      <p><i>Income management interface</i></p>
    </div>
    <br />
    <div>
      <img src="https://github.com/user-attachments/assets/5a950ad0-cfff-4ea2-a61a-81d9c7d91bac" width="380px" />
      <p><i>Expense tracking with categories</i></p>
    </div>
  </div>
  
  <br />
  
  <div style="display: flex; justify-content: space-between;">
    <div>
      <img src="https://github.com/user-attachments/assets/6506d106-0642-4dd5-85b0-022b3518bc6b" alt="Mobile View" width="380px" />
      <p><i>Responsive mobile interface</i></p>
    </div>
  </div>
</div>



## ✨ Features

### Core Functionality
- **Secure Authentication** - JWT-based login and registration system
- **Financial Dashboard** - At-a-glance view of your total balance, income, and expenses
- **Transaction Management** - Add, view, and delete both income and expense records
- **Data Export** - Download your financial data in Excel format

### User Experience
- **Interactive Visualizations** - Analyze your finances with Bar, Pie, and Line charts
- **Recent Transactions** - Quick access to your latest financial activities
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Intuitive Interface** - User-friendly sidebar navigation and hover-to-delete functionality

## 🛠️ Tech Stack

### Frontend
- React
- HTML/CSS
- JavaScript
- Chart visualization library (Chart.js/Recharts)

### Backend
- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT)

### Utilities
- Excel export library
- Responsive design framework

## 📋 Getting Started

### Prerequisites
- Node.js (v12+)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker-app.git
   cd expense-tracker-app
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Configure environment variables**
   
   Create `.env` files in both the backend and frontend directories:

   Backend `.env` example:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## 🚀 Usage Guide

1. **Create an account** or log in with existing credentials
2. **Explore your dashboard** to view financial summaries
3. **Manage transactions** by adding new income/expenses or removing existing ones
4. **Analyze patterns** using the interactive charts
5. **Export data** as Excel files for external record-keeping
6. **Navigate easily** using the responsive sidebar menu

## 📁 Project Structure

```
expense-tracker-app/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation
│   ├── .env            # Environment variables
│   ├── server.js       # Entry point
│   └── package.json    # Backend dependencies
└── frontend/
    ├── public/         # Static assets
    ├── src/
    │   ├── components/ # Reusable UI elements
    │   ├── pages/      # Screen components
    │   ├── App.js      # Root component
    │   └── index.js    # Entry point
    ├── .env            # Frontend variables
    └── package.json    # Frontend dependencies
```

## 👥 Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please follow existing code styles and include documentation for new features.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



<p align="center">Made with ❤️ by [Arijeet Das]</p>
