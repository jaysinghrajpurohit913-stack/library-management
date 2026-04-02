# Library Management API Documentation

## Overview

This project is a simple Library Management System built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* HTML + Fetch API (Frontend)

The API allows you to:

* Add a book
* Get all books
* Issue/Update a book
* Delete a book

---

# Base URL

```
http://localhost:3000/add
```

All endpoints are prefixed with `/add`.

---

# Data Model (Book Schema)

Each book stored in the database has the following fields:

| Field         | Type     | Required | Description                         |
| ------------- | -------- | -------- | ----------------------------------- |
| title         | String   | Yes      | Book title                          |
| author        | String   | Yes      | Author name                         |
| publishedYear | Number   | Yes      | Year of publication                 |
| price         | Number   | Yes      | Book price                          |
| issued        | Boolean  | No       | Book issued status (default: false) |
| _id           | ObjectId | Auto     | MongoDB generated ID                |

Example Book Object:

```json
{
  "_id": "69ce6fdd6cd23aba411cf666",
  "title": "Node.js Basics",
  "author": "John Smith",
  "publishedYear": 2022,
  "price": 450,
  "issued": false
}
```

---

# API Endpoints

## 1. Add Book

### Endpoint

```
POST  /add/books  
```

### Full URL

```
http://localhost:3000/add/books
```

### Description

Creates a new book in the database.

### Request Headers

```
Content-Type: application/json
```

### Request Body

```json
{
  "title": "Node.js Basics",
  "author": "John Smith",
  "publishedYear": 2022,
  "price": 450,
  "issued": false
}
```

### Success Response (201)

```json
{
  "_id": "69ce6fdd6cd23aba411cf666",
  "title": "Node.js Basics",
  "author": "John Smith",
  "publishedYear": 2022,
  "price": 450,
  "issued": false,
  "__v": 0
}
```

### Error Response (500)

```json
{
  "message": "Error message"
}
```

---

## 2. Get All Books

### Endpoint

```
GET  /add/books  
```

### Full URL

```
http://localhost:3000/add/books
```

### Description

Fetches all books from the database.

### Request Headers

```
Content-Type: application/json
```

### Success Response (200)

```json
[
  {
    "_id": "69ce6fdd6cd23aba411cf666",
    "title": "Node.js Basics",
    "author": "John Smith",
    "publishedYear": 2022,
    "price": 450,
    "issued": false  
  }
]
```

---

## 3. Update / Issue Book

### Endpoint

```
PATCH  /add/books/:id
```

### Full URL Example

```
http://localhost:3000/add/books/69ce6fdd6cd23aba411cf666
```

### Description

Updates the issued status of a book.

### Request Body

```json
{
  "issued": true
}
```

### Success Response (200)

```json
{
  "book": {
    "_id": "69ce6fdd6cd23aba411cf666",
    "title": "Node.js Basics",
    "author": "John Smith",
    "publishedYear": 2022,
    "price": 450,
    "issued": true
  },
  "message": "Book updated successfully"
}
```

### Error Response (404)

```json
{
  "message": "Book not found"
}
```

---

## 4. Delete Book

### Endpoint

```
DELETE  /add/books/:id
```

### Full URL Example

```
http://localhost:3000/add/books/69ce6fdd6cd23aba411cf666
```

### Description

Deletes a book from the database.

### Success Response (200)

```json
{
  "book": {
    "_id": "69ce6fdd6cd23aba411cf666",
    "title": "Node.js Basics",
    "author": "John Smith"
  },
  "message": "Book deleted successfully"
}
```

### Error Response (404)

```json
{
  "message": "Book not found"
}
```

---

# API Summary Table

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | /add/books  | Add a new book    |
| GET    | /add/books  | Get all books     |
| PATCH  | /add/books/ | Issue/Update book |
| DELETE | /add/books/ | Delete book       |

---

# Project Structure

```
LIBRARY_management
│
├── models
│   └── book.models.js
│
├── controller
│   └── book.controller.js
│
├── routes
│   └── book.routes.js
│
├── src
│   └── app.js
│
├── server.js
│
└── index.html
```

---

# Backend Flow

```
Route → Controller → Model → MongoDB → Response
```

Example:

```
POST /add/books
      ↓
router.post()
      ↓
addbook controller
      ↓
BookModel.create()
      ↓
MongoDB
      ↓
JSON Response
```

---

# Frontend Flow

```
HTML Form → JavaScript → fetch() → Express API → MongoDB → Response → UI Update
```

---

# How to Run Project

## Start Backend

```
node server.js
```

## Open Frontend

Open your HTML file in browser or use Live Server.

---

# Future Improvements

You can extend this project by adding:

* Return book feature
* Update book price
* Search books
* User login system
* Issue date tracking
* Pagination
* React frontend
* WebSocket notifications

---

# Conclusion

This project implements a full CRUD REST API with:

* Express server
* MongoDB database
* Mongoose models
* RESTful routes
* Frontend integration using Fetch API

This is a basic full-stack Library Management System.
