#!/bin/bash

# Define application directory and environment
APP_DIR="$(pwd)"
export NODE_ENV="production"
export NEXT_TELEMETRY_DISABLED=1

echo "Stopping any running Next.js processes..."
pkill -f "node server.js" || true

echo "Cleaning up build artifacts..."
rm -rf .next
rm -f stdout.log stderr.log

echo "Installing dependencies if needed..."
npm install --production --no-audit --no-fund

echo "Building the application with production settings..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed! Check the error messages above."
  exit 1
fi

echo "Starting the production server..."
NODE_ENV=production NODE_OPTIONS="--max-old-space-size=4096" node server.js > stdout.log 2> stderr.log &

# Store the process ID
echo $! > .pid

echo "Application restarted with PID $(cat .pid)!"
echo "Check logs with: tail -f stdout.log stderr.log"
echo "To stop the server: kill $(cat .pid)" 