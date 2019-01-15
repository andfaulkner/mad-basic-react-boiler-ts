#!/usr/bin/env bash

# Remove and re-create build folder
rm -rf ./build
mkdir ./build 2>/dev/null
mkdir ./build/client 2>/dev/null
mkdir ./build/server 2>/dev/null

# Refresh node modules (remove and reinstall)
rm -rf ./node_modules
npm install

# Rebuild project
npm run build-all

echo "Clean complete!"
