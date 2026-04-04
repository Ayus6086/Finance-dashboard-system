# 💰 Finance Dashboard System

## 🚀 Overview

This project is a backend system for a finance dashboard where users can manage financial records and view analytics based on their roles.

It supports role-based access control, financial record management, and summary-level insights for dashboards.

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB Atlas (Cloud Database)
* Mongoose
* JWT Authentication
* bcrypt (password hashing)

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## 🔐 Authentication & Roles

### Roles:

* **Viewer** → Can view dashboard data only
* **Analyst** → Can view records and analytics
* **Admin** → Full access (CRUD + user management)

Authentication is handled using JWT tokens.

---

## 📡 API Endpoints

### 🔐 Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

---

### 👤 Users (Admin Only)

* GET `/api/users`
* PUT `/api/users/:id`

---

### 💰 Records

* POST `/api/records` → Create record (Admin)
* GET `/api/records` → Get records (Admin, Analyst)
* PUT `/api/records/:id` → Update record (Admin)
* DELETE `/api/records/:id` → Delete record (Admin)

---

### 🔍 Filtering

* GET `/api/records?type=expense`
* GET `/api/records?category=food`
* GET `/api/records?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

---

### 📊 Dashboard APIs

* GET `/api/records/summary`
* GET `/api/records/category`
* GET `/api/records/recent`
* GET `/api/records/trends`

---

## 🧠 Design Decisions

* Used **JWT authentication** for stateless sessions
* Implemented **role-based middleware** for access control
* Added **service layer** to separate business logic from controllers
* Used **MongoDB** for flexible schema and aggregation queries
* Designed APIs to support both CRUD and analytical operations

---

## ⚖️ Trade-offs

* Did not implement pagination to keep the system simple
* Used simple aggregation instead of complex pipelines for readability
* Focused more on clarity and structure than over-optimization

---

## 🗄 Database Design

### User Model

* name
* email (unique)
* password (hashed)
* role (admin / analyst / viewer)
* status (active / inactive)

### Record Model

* userId (reference to User)
* amount
* type (income / expense)
* category
* date
* notes

---

## 🔐 Security

* Passwords hashed using bcrypt
* JWT used for authentication
* Role-based middleware enforces access control
* Users can only modify their own records

---

## 🧪 Testing

All APIs were tested using Postman.

Tested scenarios:

* Valid & invalid inputs
* Role-based access restrictions
* Filtering & dashboard calculations

---

## ⚠️ Assumptions

* Each record belongs to a single user
* Only admins can manage users
* Viewers can only access dashboard APIs
* Data volume is moderate (no pagination required initially)

---

## 🚀 Additional Features

* Advanced filtering (date, category, type)
* Dashboard analytics (summary, category-wise, trends)
* Service-layer architecture for scalability

---

## 💡 Future Improvements

* Add pagination for large datasets
* Add sorting options
* Add real-time analytics
* Implement refresh tokens for authentication

---

## 🏁 Conclusion

This project demonstrates backend design principles including:

* Clean architecture
* Role-based access control
* Data modeling
* API design for both CRUD and analytics

The focus was on building a structured and logical backend system rather than unnecessary complexity.
