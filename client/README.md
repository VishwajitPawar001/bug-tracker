# 🚀 Bug Tracker Application

A full-stack **Bug Tracking & Project Management System** built with modern web technologies.
This application allows teams to collaborate, manage projects, track issues, and communicate efficiently.

---

## 📌 Features

### 🔐 Authentication

* User registration & login (JWT-based)
* Secure protected routes

### 📁 Project Management

* Create and manage projects
* Add/remove team members
* View project-specific boards

### 🐞 Ticket System

* Create, edit, delete tickets
* Drag & drop ticket workflow (To Do → In Progress → Done)
* Assign tickets to team members
* Priority levels (Low / Medium / High)

### 📎 Attachments

* Upload files to tickets
* View/download attachments

### 💬 Comments System

* Add comments to tickets
* View discussion history
* User-based comment tracking with timestamps

### 🎯 Advanced UI/UX

* Smooth drag-and-drop interactions
* Responsive modern UI
* Real-time feel with instant updates

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* DnD Kit (Drag & Drop)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* JSON Web Tokens (JWT)

### File Upload

* Multer

---

## 📂 Folder Structure

```
project-root/
│
├── client/               # Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── server/               # Backend (Node/Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/bug-tracker.git
cd bug-tracker
```

---

### 2️⃣ Install dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd client
npm install
```

---

### 3️⃣ Run the application

#### Start backend

```
cd server
npm run dev
```

#### Start frontend

```
cd client
npm run dev
```

---

## 📸 Screenshots

> Add your screenshots here

* Dashboard
* Ticket Board
* Comments System

---

## 🧠 How It Works

* Users create projects and invite team members
* Tickets are created and assigned within projects
* Tickets move across workflow stages using drag & drop
* Users collaborate through comments and attachments

---

## 🔥 Future Improvements

* Edit & delete comments
* Activity logs (audit trail)
* Real-time updates (Socket.IO)
* File preview (images/PDF)
* Notifications system

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **[Your Name]**

---

⭐ If you like this project, consider giving it a star!
