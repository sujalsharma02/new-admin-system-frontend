# Employee Management System

A comprehensive web application for managing employees and task assignments. This system supports role-based access control for Admins and Employees, allowing for efficient task tracking and management.

## 🚀 Live Demo
**Frontend Deployed Here:** [https://employees-admin-system.vercel.app/](https://employees-admin-system.vercel.app/)

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Library for building user interfaces.
- **Vite**: Next Generation Frontend Tooling for fast build and dev server.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Context API**: For state management across the application.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Token)**: For secure authentication and authorization.

### Deployment
- **Vercel**: For hosting frontend and backend services.

---

## ✨ Features

### Admin Dashboard
- **Create Tasks**: Assign new tasks to specific employees with Title, Date, Description, and Category.
- **Dashboard Overview**: View statistics for All Tasks, New Tasks, Active Tasks, Completed, and Failed tasks.
- **Employee List**: View a list of all employees and their task status counts.

### Employee Dashboard
- **Task Overview**: View personal task statistics (New, Active, Completed, Failed).
- **Task Management**:
  - **Accept Task**: Mark a newly assigned task as Active.
  - **Complete Task**: Mark an active task as Completed.
  - **Fail Task**: Mark a task as Failed if unable to complete.
- **Task Lists**: Categorized view of all assigned tasks.

### Authentication
- **Secure Login**: Role-based authentication (Admin vs Employee).
- **Session Management**: Persistent login state using LocalStorage and Context API.

---

## 🔑 Default Login Credentials

### Admin Access
- **Email:** `admin@example.com`
- **Password:** `123`

### Employee Access
Use any of the following to test employee features:

1. **Kaustubh**
   - **Email:** `e@e.com`
   - **Password:** `123`

2. **Aayush**
   - **Email:** `employee2@example.com`
   - **Password:** `123`

3. **Karan**
   - **Email:** `employee3@example.com`
   - **Password:** `123`

4. **Faiz**
   - **Email:** `employee4@example.com`
   - **Password:** `123`

5. **Swayam**
   - **Email:** `employee5@example.com`
   - **Password:** `123`

---

## 📦 Installation & Setup

1. **Clone the Repositories**
   ```bash
   # Clone Frontend
   git clone https://github.com/sujalsharma02/new-admin-system-frontend.git

   # Clone Backend
   git clone https://github.com/sujalsharma02/new-admin-system-backend.git
   ```

2. **Backend Setup**
   ```bash
   cd new-admin-system-backend
   npm install
   
   # Create .env file
   # PORT=5000
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_secret_key

   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd new-admin-system-frontend
   npm install

   # Update config (if running locally)
   # Ensure src/utils/config.js points to http://localhost:5000

   npm run dev
   ```
