#  Store Rating Platform

A full-stack Store Rating Platform developed as part of the Roxiler Systems Full Stack Internship Assessment.

The application allows users to browse stores, submit ratings, and provides role-based dashboards for Admins, Store Owners, and Users.

---

#  Features

## Authentication

- User Registration
- Secure Login using JWT
- Password Encryption using bcrypt
- Role Based Authorization
- Protected Routes

---

## Admin Features

- Dashboard with Analytics
- View Total Users
- View Total Stores
- View Total Ratings
- Average Rating Analytics
- Manage Users (Create, Update, Delete)
- Manage Stores (Create, Update, Delete)
- Assign Store Owners
- Search & Sort Users
- Search & Sort Stores
- View Store Details
- View User Details
- Change Password

---

## Store Owner Features

- Store Dashboard
- View Store Information
- View Customers Who Rated
- View Average Rating
- Store Performance Analytics
- Change Password

---

##  User Features

- Browse Stores
- Search Stores
- Submit Ratings
- Update Existing Ratings
- View Personal Ratings
- Change Password

---

#  Tech Stack

## Frontend

- React.js
- Vite
- CSS3
- Axios
- React Router DOM
- Framer Motion
- Recharts
- React Icons

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
- CORS
- dotenv

---

#  Database

The project uses PostgreSQL with the following tables:

- Users
- Stores
- Ratings

Relations:

Users (Store Owner)
        │
        ▼
      Stores
        │
        ▼
      Ratings
        ▲
        │
      Users

---

#  Project Structure

```
Roxiler-System-Assessment
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
├── frontend
│   ├── src
│   │
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── routes
│   ├── services
│   ├── styles
│   └── utils
│
└── README.md
```

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Roxiler-System-Assessment.git
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file

```env
PORT=5000

DATABASE_URL=YOUR_POSTGRES_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:5000
```

---

# 👥 Demo Credentials

## Admin

Email

```
admin@test.com
```

Password

```
Admin@123
```

---

## Store Owner

Email

```
michael.owner@gmail.com
```

Password

```
Owner@123
```

---

## User

Email

```
khushi@gmail.com
```

Password

```
User@123
```

---

#  Application Modules

- Authentication
- Admin Dashboard
- Store Owner Dashboard
- User Dashboard
- User Management
- Store Management
- Rating System
- Analytics Dashboard
- Search & Filtering
- Responsive Design

---

#  Key Functionalities

- JWT Authentication
- Password Hashing
- CRUD Operations
- Protected APIs
- Role Based Access
- Store Rating System
- Dynamic Dashboard
- Data Visualization using Recharts

---

#  Future Improvements

- Email Verification
- Password Reset
- Profile Image Upload
- Pagination
- Export Reports
- Notification System
- Dark Mode

---

# Developed By

Rakshit Suresh Kamboj

Government College of Engineering and Research,
Avasari Khurd, Pune

GitHub:
https://github.com/rakshitkamboj21

---

#  Thank You

Thank you for reviewing this project.

This application was developed as part of the Roxiler Systems Full Stack Internship Assessment.