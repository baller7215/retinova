FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libffi-dev \
    libgl1 \
    libglib2.0-0 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code into the container
COPY . .

# Expose the port that the app will run on
EXPOSE 8000

# Start the application using Uvicorn
CMD ["uvicorn", "ml_app:app", "--host", "0.0.0.0", "--port", "8000"]
