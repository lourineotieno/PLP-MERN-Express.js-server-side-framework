# Express Products API

## Setup
1. Install dependencies: npm install
2. Create .env file (see .env.example)
3. Run server: node server.js
4. Server runs at http://localhost:3000

## API Endpoints

- GET /api/products → List all products (optional query: category, search, page, limit)
- GET /api/products/:id → Get product by ID
- POST /api/products → Create product (requires x-api-key header)
- PUT /api/products/:id → Update product (requires x-api-key header)
- DELETE /api/products/:id → Delete product (requires x-api-key header)
- GET /api/products/stats/category → Product count by category
