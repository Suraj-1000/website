# Build Stage
FROM node:20-alpine

WORKDIR /app


# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Expose API Port
EXPOSE 5000

# Start the server
CMD sh -c "npx sequelize-cli db:migrate && npm start"
