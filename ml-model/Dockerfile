FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libffi-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port for the model service
EXPOSE 8000

# Run the ml_app.py file
CMD ["uvicorn", "ml_app:app", "--host", "0.0.0.0", "--port", "8000"]
