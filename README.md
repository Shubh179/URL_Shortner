# URL Shortener

A robust, production-ready URL shortener built with Node.js, Express, and MongoDB. The application features user authentication, URL generation, visit tracking, and analytics.

## Features
- **User Authentication:** Sign up and log in securely using JWT tokens.
- **Role-Based Access Control:** Differentiates between regular users and administrators.
- **Analytics Tracking:** Records the total clicks and exact timestamps of each visit to a shortened URL.
- **Dynamic Routing:** Environment variable driven routing to easily switch between local development, static IP addressing, and custom domain names.

## Technology Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Templating:** EJS (Server-Side Rendering)
- **Containerization:** Docker, Docker Compose
- **Hosting:** AWS EC2

---

## Deployment Journey (DevOps Pipeline)

This project has been fully containerized and deployed to an AWS EC2 instance. Below are the steps we executed to take it from local development to a live production server.

### 1. Dockerization
- Created a `Dockerfile` using the lightweight `node:20-alpine` base image.
- Optimized the build by copying `package.json` first and using `npm ci --omit=dev` for production installations.
- Created a `docker-compose.yml` to orchestrate both the Node.js application and the MongoDB database side-by-side.

### 2. Pushing to Registries
- Pushed the raw source code and blueprints to **GitHub**.
- Built the final Docker image and pushed it to **Docker Hub** (`shubh1709/url-shortener:latest`), making it available for remote servers to download instantly.

### 3. AWS EC2 Deployment
- Launched a free-tier Ubuntu Server on **AWS EC2**.
- Configured EC2 Security Groups to allow inbound traffic on SSH (Port 22) and HTTP for the application (Port 8001).
- Installed Docker Engine inside the Ubuntu environment.
- Pulled the `docker-compose.yml` and the Docker image onto the server.

### 4. Dynamic Environment Variables & Static IPs
- Refactored the Node.js code and EJS templates to accept a `BASE_URL` environment variable via `app.locals`.
- Assigned an **AWS Elastic IP** to the EC2 instance to ensure a permanent, non-changing IP address.
- Updated the `docker-compose.yml` file to inject the new permanent IP (e.g., `BASE_URL=http://<ELASTIC_IP>:8001`) into the container.

---

## How to Run Locally

1. Clone the repository.
2. Make sure Docker Desktop is installed and running.
3. Start the containers in the background:
   ```bash
   docker-compose up -d
   ```
4. Access the application at `http://localhost:8001`.

## How to Update the Live Server

1. Make changes to the Node.js code locally.
2. Build and push the new Docker image:
   ```bash
   docker build -t shubh1709/url-shortener:latest .
   docker push shubh1709/url-shortener:latest
   ```
3. SSH into the AWS EC2 instance and pull the new updates:
   ```bash
   cd ~/url-shortener
   sudo docker-compose pull
   sudo docker-compose down
   sudo docker-compose up -d
   ```
