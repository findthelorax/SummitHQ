# Ski Resort Backend API

## Overview
This project is a backend application for managing ski resort mountains. It provides a RESTful API for performing CRUD operations on mountain data. The application is built using TypeScript and Express, and it supports configurable database connections for PostgreSQL or MySQL.

## Features
- RESTful API for managing mountains
- CRUD operations: Create, Read, Update, Delete
- Configurable database connection options
- Environment variable management using a `.env` file
- Structured folder layout for easy expandability

## Project Structure
```
ski-resort-backend
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers           # Contains controller classes for handling requests
│   │   └── mountainController.ts
│   ├── routes                # Defines API routes
│   │   └── mountainRoutes.ts
│   ├── models                # Contains data models
│   │   └── mountainModel.ts
│   ├── config                # Configuration files
│   │   └── database.ts
│   ├── middleware            # Middleware functions
│   │   └── errorHandler.ts
│   └── utils                 # Utility functions
│       └── index.ts
├── .env                      # Environment variables for configuration
├── .env.example              # Template for the .env file
├── package.json              # NPM configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ski-resort-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` template and configure your database connection settings.

4. Start the application:
   ```
   npm start
   ```

## Usage
- The API endpoints for managing mountains can be accessed at `/api/mountains`.
- Use tools like Postman or cURL to interact with the API.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.