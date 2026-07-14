# MongoDB Query Writing API

A simple Node.js + Express + MongoDB API for managing books.

## Features

- Express server
- Mongoose models
- Book repository, service, and controller layers
- Error handling middleware
- Environment configuration support

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the required environment variables, for example:

3. Start the server:

```bash
npm run dev
```

4. Open `http://localhost:3000` or use API clients like Postman.

## Scripts

- `npm start` - Run the app with Node
- `npm run dev` - Run the app with Nodemon for development

## Dependencies

- `express`
- `mongoose`
- `dotenv`
- `cors`
- `pino`
- `pino-http`
- `zod`

## Recommended Git Ignore

Add `.env`, `node_modules`, and other local files to keep secrets and build artifacts out of version control.
