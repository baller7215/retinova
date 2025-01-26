# Use the Node.js Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

# Debug: Print environment variables to confirm they're being passed correctly
RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}"
RUN echo "NEXT_PUBLIC_MODEL_URL=${NEXT_PUBLIC_MODEL_URL}"

# Install dependencies
RUN npm install --omit=dev=false

# Copy the rest of the application code
COPY . .

# Debug: Write environment variables into a .env file for the build process
RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" > .env
RUN echo "NEXT_PUBLIC_MODEL_URL=${NEXT_PUBLIC_MODEL_URL}" >> .env

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Run the application in production mode
CMD ["npm", "run", "start"]
