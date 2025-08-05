![Node.js](https://img.shields.io/badge/node-%3E=18.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

# CGX-ProfileX

⚠️ **Note: This project is no longer live. It was built as part of the CGS (IIT KGP) 2025 Sophomore Selection under the WebX Track, and the deployment on Render has been turned off as of August 2025.**

A full-stack web application built with **React (Vite)**, **Node.js (Express)**, and **MongoDB Atlas**, developed for the **CGS (IIT KGP) 2025 Sophomore Selection Task** under the **WebX Track**.

Author: **Neelabh Priyam Jha**

## Project Overview

CGX-ProfileX is a full-stack profile dashboard app that allows users to create and manage personalized profiles.

### Tech Stack

-   **Client:** React (Vite)
-   **Server:** Node.js + Express
-   **Database:** MongoDB
-   **Auth:** JWT (HTTP-only cookies)
-   **Deployment:** Render.com
-   **Containerization:** Docker, Docker Compose
-   **Language:** TypeScript

## Live Demo

~~You can try the live version of CGX-ProfileX [here](https://cgx-profilex.onrender.com):~~

-   **Client:** ~~[https://cgx-profilex.onrender.com](https://cgx-profilex.onrender.com)~~
-   **Server:** ~~[https://cgx-profilex-server.onrender.com](https://cgx-profilex-server.onrender.com)~~

> ⚠️ The client relies entirely on the server for authentication and data.
> For full functionality (login, profile access), both services must be online and connected.

~~To understand how the project is deployed, refer to the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) file.~~

## UI Preview

Here are a few screenshots from the live app:

### SingIn Page

![SingIn Page](./assets/screenshots/signIn-page.png)

### SingUp Page

![SingUp Page](./assets/screenshots/signUp-page.png)

### Profile Page

![Profile Page](./assets/screenshots/profile-page.png)

### Edit Bio Page

![Edit Bio Page](./assets/screenshots/editBio-page.png)

## Features

-   **User Authentication**

    -   Register and log in using secure, cookie-based JWT authentication.
    -   Auth state persists across page reloads via HTTP-only cookies.

-   **Profile Management**

    -   Users can view their profile after logging in.
    -   Profile data is fetched securely from the Server.

-   **Client (React + Vite)**

    -   Responsive single-page application (SPA).
    -   React Router for protected routes like `/profile`.

-   **Server (Express + MongoDB)**

    -   RESTful API with secure endpoints.
    -   MongoDB Atlas for cloud-hosted database operations.

-   **Dockerized Local Development**

    -   Fully containerized setup with Docker and Docker Compose.
    -   Nginx used locally to serve Client and reverse-proxy API requests.

-   **Production Deployment**
    -   Deployed to Render: client as static site, server as web service.
    -   Secure communication between Client and Server over HTTPS.

## Project Structure

This project follows a standard full-stack monorepo layout:

```text
CGX-ProfileX/
├── client/             # React Client (Vite)
├── server/             # Express Server (Node.js)
├── docker/             # Dockerfiles and Nginx config
├── docker-compose.yml
├── ...
```

### Architecture

-   The React client is a SPA built with Vite and deployed as a static site.
-   The Express server exposes REST APIs and connects to MongoDB database for persistent data storage..
-   Authentication uses secure HTTP-only cookies.
-   Client and server are deployed separately and communicate over HTTPS.

## Installation & Local Development

To run CGX-ProfileX locally without Docker, follow the steps below.

### 1. Prerequisites

-   Node.js (v18 or above)
-   npm (or yarn)
-   Local MongoDB server or MongoDB Atlas account (for a cloud-hosted DB URI)

---

### 2. Clone the Repository

```bash
git clone https://github.com/athena-seguace/CGX-ProfileX
cd CGX-ProfileX
```

### 3. Setup Server (can work standalone)

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory similar to `server/.env.sample`:

```env
NODEJS_SERVER_ENV = "dev"

NODEJS_SERVER_MONGODB_URI = "REPLACE_WITH_CONNECTION_URL"
NODEJS_SERVER_MONGODB_POOL_SIZE = "50"

NODEJS_SERVER_CLIENT_URL = "http://localhost:5173"
NODEJS_SERVER_SERVER_PORT = "5500"

NODEJS_SERVER_JWT_SECRET_KEY = "REPLACE_WITH_YOUR_SECRET_KEY"
```

Start the server:

```bash
npm run compile
npm start
```

The server will run on [http://localhost:5500](http://localhost:5500).

### 4. Setup Client (client has dependency on the server)

```bash
cd client
npm install
```

Create a `.env.development` file inside the `client/` directory similar to `client/.env.development.sample`:

```env
VITE_SERVER_API_BASE_URL = http://localhost:5500/api/v1
```

Start the client:

```bash
npm run dev
```

The client can be accessed on [http://localhost:5173](http://localhost:5173).

## Docker Setup (Optional)

You can run the entire project using Docker and Docker Compose:

Build and Start Containers

```bash
docker-compose up --build
```

This will:

-   Build and serve the client via Nginx on [http://localhost:5173](http://localhost:5173)
-   Start the Express server on [http://localhost:5500](http://localhost:5500)

---

## Acknowledgements

Special thanks to **CGS (IIT Kharagpur)** for organizing this event and providing the opportunity to learn and build.

## Final Note

To anyone taking the time to read through this project — thank you.

Whether you're a reviewer, a fellow developer, or someone just exploring, I genuinely appreciate your time and attention.

Warm regards,
Neelabh Priyam Jha

---
