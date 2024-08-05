# SaaS Book Library Management System
=====================================

A full-stack SaaS application for managing book libraries, built using Node.js, Express.js, MongoDB, and react.js.

## Functionality
---------------

* User Registration
* User Login and Authentication
* User/Book details
* Book Management: create, update, delete
* Borrowing Book: borrow, return

-----------------

### User Authentication

* `POST /users/register`: Register a new user.
* `POST /users/login`: Log in with a registered user.
* `GET /users/`: Get all user details (jwt protected).

### Book Management

* `GET /books/`: List of all available books.
* `GET /books/search?{title=?,available=? }`: Update book details.
* `POST /books/`: Add a new book.
* `PUT /books/`: Update book details.
* `DELETE /books/`: Delete a book from database.

### Borrowing Book

* `POST /borrow/{:bookid}`: Borrow a new book (jwt protected).
* `POST /borrow/return/{:bookid}`: Return a borrowed book.

## Technologies Used
--------------------
* react,js
* Node.js
* Express.js
* MongoDB
* Mongoose
* Bcrypt
* JWT
* Swagger (for API documentation)

## Getting Started
---------------

[Link](library-management-app-xi.vercel.app)
