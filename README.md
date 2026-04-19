# StockHub - Product Inventory System

> 🚀 **Live Demo:** [https://sesd-ugc.onrender.com](https://sesd-ugc.onrender.com)

A robust, production-ready RESTful API and Dashboard for managing product inventory, featuring a modern neon anime aesthetic.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete products.
- **Advanced Querying**: Search (text-based), Filtering (by category, price, availability), Sorting, and Pagination.
- **Authentication**: Secure JWT-based authentication for write operations.
- **Architecture**: Clean 3-Layer Architecture (Controller -> Service -> Repository).
- **Validation & Error Handling**: Robust input validation and centralized error management.
- **Scalable**: Built with TypeScript and Mongoose for type safety and scalability.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/product-inventory-system.git
    cd product-inventory-system
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/product_inventory
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the server**:
    - Development: `npm run dev`
    - Production: `npm run build && npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT token.

### Products
- `GET /api/products`: List products (supports `?page=1&limit=10&search=laptop&category=Electronics`).
- `GET /api/products/:id`: Get a product by ID.
- `POST /api/products`: Create a product (Requires Auth).
- `PUT /api/products/:id`: Update a product (Requires Auth).
- `DELETE /api/products/:id`: Delete a product (Requires Auth).

## Project Structure

```
src/
├── controllers/  # Request handlers
├── services/     # Business logic
├── repositories/ # Data access layer
├── models/       # Database schemas
├── routes/       # API route definitions
├── middlewares/  # Express middlewares (Auth, Error, etc.)
└── app.ts        # App setup
```

## Testing

For verification without a local MongoDB, you can use the built-in memory server mode:

```bash
USE_MEMORY_DB=true npm run dev
```

Then run the verification script:

```bash
npx ts-node verify_api.ts
```
