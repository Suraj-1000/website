# Build Stage
FROM node:20-alpine

WORKDIR /app

# Copy env file
COPY .env ./

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Expose API Port
EXPOSE 7008

# Start the server
CMD sh -c "npm run migrate && npm run start"
