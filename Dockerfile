# Dockerfile
FROM python:3.11-slim

# Install system dependencies for ODBC and SQL Server
RUN apt-get update && apt-get install -y \
    curl \
    apt-transport-https \
    gnupg \
    lsb-release \
    unixodbc \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/*

# Add Microsoft repository and install ODBC driver
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg \
    && echo "deb [arch=amd64,armhf,arm64 signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" | tee /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /project

# Copy requirements first for better cache utilization
COPY ./requirements.txt /project/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory to preserve package structure
COPY ./app /project/app

EXPOSE 8000

# Set PYTHONPATH so 'app' module can be found
ENV PYTHONPATH=/project

# Use uvicorn to run the application in production mode
# The event loop will be automatically selected based on platform in app/utils/event_loop.py
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
