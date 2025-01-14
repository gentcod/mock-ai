# Sentiment Analysis Backend Service

A Node.js backend service that simulates performing sentiment analysis on text input using a mock AI service.

## Features

- RESTful API endpoints for text analysis and result retrieval
- Mock sentiment analysis service
- In-memory SQLite database storage
- Docker support
- Unit tests
- Input validation
- User Authentication
- Logging middleware

## Prerequisites

- Node.js 18+ or Docker

## Installation

### Using Node.js

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add following environmental variables:

```
   PORT= # Port address to run your api. E.g 5000. 
   DB_STRING=somestring.db # SQLite database file. It is optional and should be used when you want to persist the database.
   NODE_ENV= # To specify the application environment. E.g development
   JWTPRIVATEKEY= # random key string to be used for creation and validaton of tokens.
   JWTXPIRATION= # time span before token expiration. E.g 1h
```

4. Start the server:

```bash
npm run start-dev or npm run dev
```

### Using Docker

1. Build and run using Docker Compose:

```bash
docker-compose up --build
```

## API Endpoints

### POST /analyze

Analyze text sentiment.

- > Request body:

```json
{
  "text": "This is amazing!"
}
```

- > Response:

```json
{
  "status": "success",
  "responseCode": 200,
  "message": "Text analyzed successfully.",
  "data": {
    "id": 10,
    "user_email": "gentcod@gmail.com",
    "text": "hello there, good awful bad man",
    "score": 0.34,
    "timestamp": "2025-01-14T01:36:20.844Z"
  }
}
```

### GET /results

Retrieve all analysis results.

- > Response:

```json
{
  "status": "success",
  "responseCode": 200,
  "message": "Sentiment result fetch successfully.",
  "data": [
    {
      "id": 2,
      "text": "hello there, good man",
      "score": 1,
      "timestamp": "2025-01-14T01:21:04.806Z"
    }
  ]
}
```

### GET /results/:id

Retrieve single analysis result.

- > Response:

```json
{
  "status": "success",
  "responseCode": 200,
  "message": "Sentiment result(s) fetch successfully.",
  "data": {
    "id": 2,
    "text": "hello there, good man",
    "score": 1,
    "timestamp": "2025-01-14T01:21:04.806Z"
  }
}
```

## Testing

Run the test suite:

```bash
npm test
```
