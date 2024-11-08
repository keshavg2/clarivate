# Full Stack Project Setup

This project is a full-stack application with a NestJS backend, React frontend, and PostgreSQL database.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Setup Instructions](#setup-instructions)
    - [Database Setup](#database-setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
3. [Running the Application](#running-the-application)
4. [Additional Information](#additional-information)

---

## Requirements

- **Node.js**: >= 16.x
- **npm**: >= 6.x (or **yarn**)
- **PostgreSQL**: >= 12.x
- **Git** (for version control)

---

## Setup Instructions

### 1. Database Setup

Ensure PostgreSQL is installed on your machine, then create a new database.

1. **Start PostgreSQL** (skip if it’s already running):
   ```bash
   sudo service postgresql start
2. **Create Database**:
   ```sql
   CREATE DATABASE your_database_name;
3. **Set up Environment Variables**: 

    In the root project folder, create a .env file to store your database configuration (used by the backend):
    
    ````
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=your_database_name
    JWT_SECRET=your-jwt-secret
    PORT=3000

### 2. Backend Setup (NestJS)
   Navigate to the Backend Folder:
    
    cd backend_code
Install Dependencies:
    
    npm install

Run Migrations: Ensure your database is set up and migrations are in place to initialize the schema.

    npm run migration:run
Run the Backend Server:

    npm run start:dev

The backend should now be running on http://localhost:3000.

### 3. Frontend Setup (React)
   Navigate to the Frontend Folder:


    cd frontend_code
Install Dependencies:

    npm install

Run the Frontend:

     PORT=3001 npm start
The frontend should now be running on http://localhost:3001 (or whatever port is specified in package.json).
