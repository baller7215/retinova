FROM python:3.11

# Set the working directory
WORKDIR /app

# Install system dependencies
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends gnupg2 && \
#     apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 0E98404D386FA1D9 && \
#     apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 6ED0E7B82643E131 && \
#     apt-get update && apt-get install -y \
#     gcc \
#     python3-dev \
#     libffi-dev \
#     libgl1 \
#     libglib2.0-0 \
#     && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN rm -f /etc/apt/trusted.gpg && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    debian-archive-keyring ca-certificates && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libffi-dev \
    libgl1 \
    libglib2.0-0 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*



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
