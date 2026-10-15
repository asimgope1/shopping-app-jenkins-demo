# Official Microsoft Playwright image with pre-installed browsers
FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy remaining source code and tests
COPY . .

# Expose app port
EXPOSE 3000

# Default command runs test suite
CMD ["npm", "test"]
