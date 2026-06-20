# Use the official lightweight Node.js active LTS image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8001

# Start the application
CMD [ "node", "index.js" ]
