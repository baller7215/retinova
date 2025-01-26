# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "run", "dev"]
