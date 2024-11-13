# Use an official Node runtime as a parent image
FROM node:20.12.2
# Set the working directory
WORKDIR .
# Install pnpm
RUN npm install -g pnpm
# Install Prisma CLI
RUN npm install -g prisma
# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile
# Run Prisma migration
RUN prisma migrate deploy
# Generate Prisma client
RUN prisma generate
# Copy the rest of the application code
COPY . .
# Build the application
RUN pnpm run build
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["pnpm", "run", "start:prod"]