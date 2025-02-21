# Full-Stack Task Management Application

This project implements a simple Task Management application using React with TypeScript for the frontend, Node.js with Express for the backend, and PostgreSQL for the database.  It allows users to register, login, and manage their tasks.

## Features

*   User Registration and Login with JWT authentication.
*   CRUD operations for tasks (Create, Read, Update, Delete).
*   Task persistence using PostgreSQL.

## Technologies Used

*   **Frontend:** React, TypeScript, Vite
*   **Backend:** Node.js, Express
*   **Database:** PostgreSQL
*   **Authentication:** JWT (JSON Web Tokens), bcrypt (for password hashing)

## Setup

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-github-username]/[repo-name].git
    cd [repo-name]/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Database Setup (PostgreSQL):**

    *   Ensure you have PostgreSQL installed.
    *   The database and tables are created automatically using the `init.sql` script.  This script is executed when the backend server starts.  No manual database creation is required.
    *   **Important:** The `db.js` file is configured to connect to a database named `taskdb`. You should ensure this matches the database name in your PostgreSQL server.  You also need to change the user, password and port if you have a different configuration.

4.  **Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```
    PORT=5000
    DATABASE_URL=postgres://postgres:Tiru%402002@localhost:5432/taskdb  // Update with your credentials!
    JWT_SECRET='1234' //  CHANGE THIS TO A STRONG, RANDOM SECRET!
    FRONTEND_URL="http://localhost:5173" // URL of your frontend
    ```


5.  **Run the backend server:**
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `frontend` directory and add the following:
    ```
    VITE_BACKEND_URL=http://localhost:5000
    ```

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```

## Running the Application

1.  Start the backend server (as described above).
2.  Start the frontend development server (as described above).
3.  Open your browser and navigate to `http://localhost:5173` (or the port your frontend is running on).

## Testing

(Describe any specific testing you've done.  For example:)

*   Manual testing was performed to verify all CRUD operations and authentication.
*   Can test the backend apis using postman

## Video Demo

[Link to your video demo](https://vimeo.com/1059094313/353aae7823?share=copy)