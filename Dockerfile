FROM node:24.14.1-slim

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install only production dependencies
# RUN npm install --omit=dev

#For Development 
RUN npm install 

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]  

# ["node", "app.js"] need to change for production