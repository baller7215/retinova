# Use the Node.js Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev=false

# Copy the rest of the application code
COPY . .

# Inject environment variables into the build process
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_MODEL_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_MODEL_URL=$NEXT_PUBLIC_MODEL_URL

# Debug: Print environment variables to confirm they're passed
RUN echo "NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL"
RUN echo "NEXT_PUBLIC_MODEL_URL=$NEXT_PUBLIC_MODEL_URL"

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Run the application in production mode
CMD ["npm", "run", "start"]
