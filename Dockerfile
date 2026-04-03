FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]