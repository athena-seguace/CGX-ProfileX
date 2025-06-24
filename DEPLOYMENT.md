# Deployment Details

The live version of **CGX-ProfileX** is deployed on [Render.com](https://render.com), using two separate services from a single Git repository:

-   **Client:** [https://cgx-profilex.onrender.com](https://cgx-profilex.onrender.com)
-   **Server:** [https://cgx-profilex-server.onrender.com](https://cgx-profilex-server.onrender.com)

---

## Services Overview

### 1. **Client (Static Site)**

-   **Type:** Static Site
-   **Directory:** `/client`
-   **Build Command:** `npm install && npm run build`
-   **Publish Directory:** `dist`
-   **URL:** [https://cgx-profilex.onrender.com](https://cgx-profilex.onrender.com)
-   **Auto Deploy:** On changes to the `client/` directory

---

### 2. **Server (Web Service)**

-   **Type:** Web Service
-   **Region:** Singapore (Southeast Asia)
-   **Instance Type:** Free
-   **Directory:** `/server`
-   **Build Command:** `npm install && npm run compile`
-   **Start Command:** `npm start`
-   **URL:** [https://cgx-profilex-server.onrender.com](https://cgx-profilex-server.onrender.com)
-   **Auto Deploy:** On changes to the `server/` directory

---

## Auto Deployment

-   The **client** service auto-deploys when you push changes inside the `/client` directory.
-   The **server** service auto-deploys when you push changes inside the `/server` directory.
-   No manual redeployment is needed when changes are made to unrelated parts of the project.

---

## Notes

-   The client service depends on the server service being live and operational.
-   Cold starts on Render (free tier) may cause slight delays on first load after inactivity.

---
