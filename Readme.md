# 🛍️ ShopEase — Full Stack E-Commerce Application

ShopEase is a full-stack e-commerce platform built using:

- **Backend:** Spring Boot (Java), MySQL, MongoDB
- **Frontend:** React + Vite
- **Database:** MySQL (Authentication & Users) + MongoDB (Products,Orders,Carts)

---

## 🚀 Features

- 🔐 JWT Authentication & Role-based Access Control (Admin/User)
- 👤 User Registration & Login & Admin Dashboard
- 📦 Product Management (MongoDB)
- 🛒 Cart
- 🌐 API-based architecture
- 💾 Persistent database storage

---

## ⚙️ Backend Setup (Spring Boot)

### 1️⃣ Configure MySQL

Run the following commands in MySQL terminal:

````sql
CREATE DATABASE shopeaseDb;
USE shopeaseDb;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NULL,
    gmail VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address_id VARCHAR(255),
    role ENUM('ADMIN', 'USER', 'MANAGER', 'SELLER', 'SUPPORT') NOT NULL
);
````

### 2️⃣ Update `application.properties`

Edit: `src/main/resources/application.properties`

```properties
# ----------------------- MySQL -----------------------
spring.datasource.url=jdbc:mysql://localhost:3306/shopeaseDb
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# ----------------------- MongoDB ----------------------
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=shopease
```

> 🔁 Replace `YOUR_MYSQL_USERNAME` and `YOUR_MYSQL_PASSWORD` with your actual credentials.

---

## 🍃 MongoDB Setup

### 1️⃣ Create Database & Collection

Open terminal or MongoDB Compass:

```js
use shopease
db.createCollection("product")
```

### 2️⃣ Import Product JSON Data

If your file is named `data.json`:

```bash
mongoimport --db shopease --collection product --file ./data.json --jsonArray
```

> Make sure `mongo-tools` is installed:
>
> ```bash
> sudo apt install mongodb-database-tools
> ```

Run backend -> `ShopEaseApplication` file using Intelllij Idea

---

## 🎨 Frontend Setup (React + Vite)

Inside the frontend folder, run:

```bash
npm install
npm run dev
```

The frontend will run at:

```
http://localhost:3000
```

The Admin Dashboard will run at:

```
http://localhost:3000/admindashboard
```
--use ->
```
gmail=admin@shopease.com
password = admin1234
or
change in `.env` file
```

---

## 🧪 Testing

You can test REST API using:

* Postman
* VS Code

---

## 📁 Project Structure

```
ShopEase/
 ├── backend/ (Spring Boot)
 ├── frontend/ (React + Vite)
 ├── data.json (Product seed data)
 └── README.md
```

---

## 🛠 Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Backend  | Spring Boot, Spring Security, JWT    |
| Database | MySQL & MongoDB                      |
| Frontend | React, Vite, Tailwind (optional)     |
| Tools    | Maven, npm, Compass, MySQL Workbench |

---
