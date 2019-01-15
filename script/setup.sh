#!/usr/bin/env bash

# Create needed directories
mkdir ./build 2>/dev/null
mkdir ./build/client 2>/dev/null
mkdir ./build/server 2>/dev/null

# Install modules
npm install

# Handle environment variables (partially)
echo ""
echo "WARNING: modify values in ./config/env/.env to contain a value for each value in .env.example"
cp ./config/env/.env.example ./config/env/.env 2>/dev/null
echo "Current content of ./config/env/.env:"
cat ./config/env/.env

# Perform first build
npm run build-all

echo "Setup complete!"
