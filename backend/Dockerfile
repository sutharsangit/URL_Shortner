# Base Image
FROM node:22

# Create a working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Tell Docker this application uses port 5000
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]