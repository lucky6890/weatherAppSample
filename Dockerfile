# Use official Node.js LTS image
FROM node:22.18.0 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

FROM builder AS production
# Build TypeScript files
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]

FROM builder AS development

EXPOSE 3000

CMD ["npm", "run", "dev"]
