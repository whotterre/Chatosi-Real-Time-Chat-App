# 💬 Chatosi – Real-Time Chat Application

A modern real-time chat application built with **React, Node.js, Express, MongoDB, and Socket.IO**.  
Features professional code conventions, standardized patterns, and a clean architecture for scalability.

---

## 🚀 Features

- 🔐 User authentication (signup & login) with JWT  
- 👤 Real-time online/offline user status  
- 💬 Instant messaging with Socket.IO  
- 📨 Unread message notifications  
- 🖼️ User profiles with avatar support  
- 🎨 10+ customizable themes  
- 📱 Fully responsive design  
- ✨ Professional code standards & patterns

---

## 🛠️ Tech Stack

### Frontend

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Socket.IO** - Real-time communication

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **EditorConfig** - Consistent coding styles
- **Concurrently** - Running multiple scripts

---

## 📁 Project Structure

```
chatosi/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── lib/             # Utilities & configs
│   │   └── server.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # State management
│   │   ├── lib/             # Utilities & configs
│   │   └── main.jsx         # App entry point
└── package.json             # Root package configuration
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm

### Installation & Running

1. **Clone the repository**

```bash
git clone https://github.com/Bragosi/Chatosi-Real-Time-Chat-App.git
cd Chatosi-Real-Time-Chat-App
```

2. **Install all dependencies**

```bash
npm run install:all
```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Configure your MongoDB connection string and JWT secret

4. **Start development servers**

```bash
npm run dev
```

This starts both frontend (usually <http://localhost:5173>) and backend (usually <http://localhost:5000>) servers.

### Other Useful Commands

```bash
npm run build          # Build frontend for production
npm start             # Start production server
npm run lint          # Run linting on both frontend and backend
```

---

## 🎯 Code Standards

This project follows professional coding conventions:

- **4-space indentation** across all files
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **Standardized naming conventions**
- **Modular component architecture**

---

## 🌐 Live Demo  

👉 [View Chatosi Live Demo](https://chatosi-real-time-chat-app-1.onrender.com/)  

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage](https://github.com/user-attachments/assets/78c676dd-27ec-41c7-b2ee-0219013ef512)

### 💬 Chat Interface

![Chat Page](https://github.com/user-attachments/assets/2e083d22-1399-4bb9-a8a2-83b0bfd05ebd)

### 👤 User Profile

![Profile Page](https://github.com/user-attachments/assets/75a1ac04-0aeb-44d9-8a9e-7a4857002a4f)

### 🎨 Theme Settings

![Settings Page](https://github.com/user-attachments/assets/2444860c-5836-4f5f-aded-437dd0de6fea)

---

## 👨‍💻 Author

**Boluwatife** (AKA Bragosi)  

- GitHub: [@Bragosi](https://github.com/Bragosi)

---

## 📄 License

This project is licensed under the ISC License.

---

*Built with modern web technologies and professional development practices.*
