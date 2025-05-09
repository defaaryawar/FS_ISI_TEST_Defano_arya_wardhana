FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Set environment variable
ENV NODE_ENV=development

# Default command (will be overridden by docker-compose)
CMD ["npm", "run", "dev"]