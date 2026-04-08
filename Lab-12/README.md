# Lab 12 - Node JS Advanced

This lab contains three advanced Node.js exercises based on Express middleware, REST APIs, and MongoDB with Mongoose.

## Setup

```bash
cd Lab-12
npm install
```

## Exercise 1: RESTful API using Express

Run:
```bash
node Ex-1.js
```

Base URL:
- `http://localhost:4001/api/products`

Sample routes:
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

## Exercise 2: Middleware Demonstration

Run:
```bash
node Ex-2.js
```

Base URL:
- `http://localhost:4002`

Sample routes:
- `GET /public`
- `GET /secure` (expects query `?token=lab12`)

## Exercise 3: MongoDB CRUD with Mongoose

Run:
```bash
node Ex-3.js
```

Set database URL if needed:
```bash
export MONGODB_URI='mongodb://127.0.0.1:27017/lab12_db'
```

Base URL:
- `http://localhost:4003/api/items`

Sample routes:
- `POST /api/items`
- `GET /api/items`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
