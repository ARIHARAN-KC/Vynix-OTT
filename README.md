Vynix-OTT

Vynix-OTT is a platform designed for anime enthusiasts. It offers a modern, fast, and responsive frontend built using React and Vite. This setup ensures smooth performance, instant reloads during development, and easy scalability for production.

Features

Vite — next-generation frontend tooling with lightning-fast HMR

React — UI library for building interactive interfaces

ESLint — built-in linting for clean and consistent code

Fast Refresh — instant updates during development

Supports both Babel and SWC compilers for optimal performance

Official Plugins

This project supports two official React plugins for Vite:

@vitejs/plugin-react

Uses Babel
 (or oxc
) for Fast Refresh.

@vitejs/plugin-react-swc

Uses SWC
 for faster builds and hot reloading.

React Compiler (Optional)

The React Compiler is not enabled by default due to its potential impact on development and build performance.
To enable it, follow the official documentation:
React Compiler Installation Guide

ESLint Configuration

This project includes a minimal ESLint setup to ensure code consistency and quality.
For production-grade applications, it is recommended to:

Use TypeScript for better type safety

Enable type-aware lint rules

For reference, see:

Vite React + TypeScript Template

TypeScript ESLint Documentation

Installation & Setup
# Clone the repository
git clone https://github.com/ARIHARAN-KC/Vynix-OTT.git

# Navigate to the project web directory
cd web

# Install dependencies
yarn

# Start the development web server
yarn dev

Your web will be available at: http://localhost:5173

# Navigate to the project api directory
cd api

# Install dependencies
yarn

# Start the development web server
yarn start

Your api will be available at: http://localhost:5000

Build for Production
yarn build


This command generates a production-ready build in the dist folder.

This command serves the production build locally for testing.

Screenshots
![alt text](image-1.png)
![alt text](image-2.png)


License

This project is licensed under the MIT License — you are free to use and modify it as needed.


