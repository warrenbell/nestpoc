# NestJS API Proof of Concept

A simple RESTful API built with NestJS, demonstrating core features and best practices.

## Overview

This project is a proof of concept for a NestJS-based REST API. It includes:

- A basic CRUD API for a "Foo" resource
- Data validation using class-validator
- Comprehensive test suite (unit, integration, and e2e tests)
- Clean architecture with separation of concerns

## Features

- **RESTful API**: Full CRUD operations for the Foo resource
- **Data Validation**: Input validation using class-validator
- **Testing**: Comprehensive test suite covering unit, integration, and e2e tests
- **TypeScript**: Written in TypeScript for type safety and better developer experience

## API Endpoints

### Foo Resource

| Method | Endpoint      | Description                |
|--------|---------------|----------------------------|
| GET    | /foos         | Get all foos               |
| GET    | /foos/:id     | Get a specific foo         |
| POST   | /foos         | Create a new foo           |
| PATCH  | /foos/:id     | Update a foo               |
| DELETE | /foos/:id     | Delete a foo               |

### Other Endpoints

| Method | Endpoint | Description                |
|--------|----------|----------------------------|
| GET    | /        | Welcome message            |
| GET    | /health  | Health check endpoint      |

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── app.controller.ts       # Main application controller
├── app.module.ts           # Root application module
├── app.service.ts          # Main application service
├── main.ts                 # Application entry point
└── foo/                    # Foo module
    ├── dto/                # Data Transfer Objects
    │   ├── create-foo.dto.ts
    │   └── update-foo.dto.ts
    ├── foo.controller.ts   # Foo controller
    ├── foo.entity.ts       # Foo entity
    ├── foo.module.ts       # Foo module
    ├── foo.repository.ts   # Foo repository
    └── foo.service.ts      # Foo service

test/                       # Test files
├── app.integration.spec.ts # App integration tests
├── foo.integration.spec.ts # Foo integration tests
├── jest-e2e.json           # E2E test configuration
└── jest-integration.json   # Integration test configuration
```

## License

This project is licensed under the UNLICENSED license.

## Author

Warren Bell
