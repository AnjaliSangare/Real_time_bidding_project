Real-Time Bidding Project
Description
This project is a Real-Time Bidding application. It allows users to register, log in, and participate in auctions for various items. The application uses Node.js with Express for the backend, MySQL for the database, and Socket.io for real-time communication.

Requirements
Backend
You will need the following software installed in your environment:

Node.js
MySQL
Yarn (a node global package)
Node.js Installation
Windows
Download the installer from the official Node.js website.
Ensure that git is available in your PATH. You can download it from here.
Ubuntu
Run the following commands to install Node.js and npm:

$ sudo apt install nodejs
$ sudo apt install npm
Other Operating Systems
Visit the official Node.js website and the official NPM website for installation instructions for other operating systems.

Verify Installation
After installation, verify that Node.js is installed by running:

bash
Copy code
$ node --version
v8.11.3
To update npm, you can run:


$ npm install -g npm
Required Node Packages
Navigate to your project directory and install the necessary packages:


npm install express jsonwebtoken dotenv multer mysql2 sequelize socket.io
These packages include:

express: Fast, unopinionated, minimalist web framework for Node.js.
jsonwebtoken: Implementation of JSON Web Tokens for authentication.
dotenv: Loads environment variables from a .env file into process.env.
multer: Middleware for handling multipart/form-data, mainly used for file uploads.
mysql2: MySQL client for Node.js.
sequelize: Promise-based Node.js ORM for MySQL, PostgreSQL, SQLite, and MSSQL.
socket.io: Real-time bidirectional event-based communication library.
Starting the Project
After installing the required packages, start the project using nodemon to automatically restart the server when changes are made. Run the following command in your project directory:

nodemon app.js
Database Schema
Create the database and tables using the following SQL commands:


CREATE DATABASE biddingdb;
USE biddingdb;

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE items (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(150) NOT NULL,
  starting_price DECIMAL NOT NULL,
  current_price DECIMAL DEFAULT 500,
  image_url VARCHAR(500),
  end_time TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bids (
  id INT PRIMARY KEY,
  item_id INT,
  user_id INT,
  bid_amount DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notifications (
  id INT PRIMARY KEY,
  user_id INT,
  message VARCHAR(300) NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
Sample Data
Insert sample data into the tables:

sql
Copy code
INSERT INTO users VALUES (1, "Anjali", "anjali123", "anjali123@gmail.com", "user", NOW());

INSERT INTO items VALUES (1, "Artwork", "Artwork done by Anjali", 5000, 7000, "https://example.com/watch.jpg", NOW(), NOW());

API Endpoints

Users
Register: POST http://localhost:3004/api/users/register
Login: POST http://localhost:3004/api/users/login
Profile: GET http://localhost:3004/api/users/profile/1

Items
List Items: GET http://localhost:3004/api/items
Get Item: GET http://localhost:3004/api/items/1

Running the Application
Install the dependencies: npm install

Start the server: node app.js
Access the API endpoints to interact with the Real-Time Bidding system.# Real_time_bidding_project