# Stage 1: Builder
FROM oven/bun:slim AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

ARG PUBLIC_WEBFORMS_ACCESS_KEY
ENV PUBLIC_WEBFORMS_ACCESS_KEY=${PUBLIC_WEBFORMS_ACCESS_KEY}

# Build the application
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-slim AS production

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/src/routes/blog/posts ./blog/posts

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "build/index.js"]
