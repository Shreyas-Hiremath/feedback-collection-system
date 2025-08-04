# Feedback Collection System

A full-stack MERN application designed for seamless feedback collection and management. This system provides a secure, role-based platform for administrators to create dynamic forms and for users to submit feedback, all presented in a clean, modern, two-column user interface.

## Features

* **Secure Authentication:** User registration and login system using JSON Web Tokens (JWT).
* **Role-Based Access Control:** Distinct permissions for **Admins** and regular **Users**.
* **Admin Dashboard:** A comprehensive dashboard for administrators to review all submitted feedback in real-time, complete with submission dates and associated form details.
* **Dynamic Form Builder:** An intuitive, admin-only interface to create and manage custom feedback forms with a variable number of questions.
* **User Dashboard:** A clean portal for logged-in users to view a list of all available feedback forms and select one to complete.

## Technology Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JWT

## Screenshot

![Login Page](https://i.imgur.com/gK52f5L.png) 
*(You can replace this with a screenshot of your own application)*

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have the following software installed:
* [Node.js](https://nodejs.org/) (which includes npm)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a free MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    cd your-repository-name
    ```

2.  **Setup the Backend (`server`):**
    * Navigate to the server directory: `cd server`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `server` directory and add the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_string
        ```

3.  **Setup the Frontend (`client`):**
    * Navigate to the client directory: `cd ../client`
    * Install dependencies: `npm install`

### Running the Application

You will need to run the backend and frontend servers in two separate terminals.

1.  **Run the Backend Server:**
    * From the `server` directory, run:
        ```bash
        node server.js
        ```
    * The server will start on `http://localhost:5000`.

2.  **Run the Frontend Application:**
    * From the `client` directory, run:
        ```bash
        npm start
        ```
    * The application will open in your browser at `http://localhost:3000`.
