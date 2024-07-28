
---

# Book-Review-Platform

Build a web application where users can register, log in, and post reviews of their favourite books. The application should have the following features: user authentication, book review management, and a responsive user interface.

## Overview

The Book Review App allows users to:

- **Create Accounts**: Register using email, username, and password.
- **Add Reviews**: Submit reviews for books they've read, including book name, author, cover image, review description, and rating.
- **Track Reviews**: View and manage their own reviews over time.
- **Browse Reviews**: Explore reviews submitted by other users to discover new books.
- **Edit Reviews**: Update their reviews if their opinion on a book changes.

The application is built using modern technologies for both the frontend and backend.

## Technologies Used

### Frontend:

- React
- Vite
- Tailwind CSS
- React Router DOM
- React Redux & Redux Toolkit
- React Icons
- Yup (for validation)
- Redux Thunk (for asynchronous actions)

### Backend:

- Node.js
- Express.js
- Express Validator
- Express Sessions
- Passport.js (Local Strategy)
- Cookie Parser
- Mongoose
- MongoDB

## Features

- **User Authentication**: Secure sign-up and login processes.
- **Review Management**: Create, view, and edit book reviews.
- **Responsive Design**: Optimized for various devices and screen sizes.
- **Dynamic Data Handling**: Real-time data updates and management.

## Upcoming Features

- **Password Encryption**
- **Recommended Books Based On Past Reviewed Books**
- **Up Vote and Down Vote Ratings**
- **Coupons To Books in the Most Reviewed Genre**
- **A Book Club**

## Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-review-app.git
cd bookreview
```

### 2. Set Up the Frontend

1. Navigate to the frontend directory:

    ```bash
    cd bookreviewapp
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

    The frontend will be available at `http://localhost:5173` by default.

### 3. Set Up the Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory with the following content:

    ```bash
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    PORT=5001
    ```

4. Start the backend server:

    ```bash
    npm run start:dev
    ```

    The backend will be available at `http://localhost:5001` by default.

### Access the Application

- **Frontend**: Open `http://localhost:5173` in your browser to access the Book Review App.
- **Backend API**: The backend API will be running at `http://localhost:5001`.

---

