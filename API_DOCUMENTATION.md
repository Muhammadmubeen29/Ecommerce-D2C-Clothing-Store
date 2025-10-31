# 📡 API Documentation - E-Commerce Backend

Complete API reference for the e-commerce backend.

**Base URL**: `http://localhost:5000/api` (development)

**Production URL**: `https://your-backend-url.com/api`

---

## 📝 Table of Contents

1. [Authentication](#authentication)
2. [Products](#products)
3. [Cart](#cart)
4. [Orders](#orders)
5. [Contact](#contact)
6. [Subscription](#subscription)
7. [Error Responses](#error-responses)

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token_here>
```

### Register User
Create a new user account.

**Endpoint**: `POST /auth/register`

**Access**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (400):
```json
{
  "message": "User already exists with this email"
}
```

---

### Login User
Authenticate existing user.

**Endpoint**: `POST /auth/login`

**Access**: Public

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401):
```json
{
  "message": "Invalid email or password"
}
```

---

### Get User Profile
Get authenticated user's profile.

**Endpoint**: `GET /auth/profile`

**Access**: Protected

**Headers**: 
```
Authorization: Bearer <token>
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "user",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

---

### Update User Profile
Update authenticated user's profile.

**Endpoint**: `PUT /auth/profile`

**Access**: Protected

**Request Body**:
```json
{
  "name": "John Updated",
  "phone": "+1234567890",
  "address": {
    "street": "456 New St",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA"
  }
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "user",
  "address": { ... },
  "token": "new_token..."
}
```

---

## 🛍️ Products

### Get All Products
Retrieve all products with optional filters.

**Endpoint**: `GET /products`

**Access**: Public

**Query Parameters**:
- `category` - Filter by category (e.g., "Casual", "Formal")
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `featured` - Filter featured products (true/false)
- `search` - Search by name or description

**Example**:
```
GET /products?category=Casual&minPrice=50&maxPrice=100
```

**Success Response** (200):
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Elegant Embroidered Kurta",
      "description": "Beautiful hand-embroidered kurta...",
      "price": 89,
      "category": "Casual",
      "sizeOptions": ["S", "M", "L", "XL"],
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "publicId": "products/abc123"
        }
      ],
      "stock": 50,
      "isFeatured": true,
      "material": "Cotton",
      "colors": ["White", "Beige"],
      "rating": 4.5,
      "numReviews": 12,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Featured Products
Get only featured products.

**Endpoint**: `GET /products/featured`

**Access**: Public

**Success Response** (200):
```json
{
  "success": true,
  "count": 4,
  "data": [ ... ]
}
```

---

### Get Product by ID
Get single product details.

**Endpoint**: `GET /products/:id`

**Access**: Public

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Elegant Embroidered Kurta",
    ...
  }
}
```

---

### Create Product (Admin)
Create a new product.

**Endpoint**: `POST /products`

**Access**: Admin Only

**Request Body**:
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Casual",
  "sizeOptions": ["S", "M", "L"],
  "images": [
    {
      "url": "https://example.com/image.jpg"
    }
  ],
  "stock": 100,
  "isFeatured": true,
  "material": "Cotton",
  "colors": ["Blue", "Red"]
}
```

**Success Response** (201):
```json
{
  "success": true,
  "data": { ... }
}
```

---

### Update Product (Admin)
Update existing product.

**Endpoint**: `PUT /products/:id`

**Access**: Admin Only

**Request Body**: (Same as Create Product, all fields optional)

**Success Response** (200):
```json
{
  "success": true,
  "data": { ... }
}
```

---

### Delete Product (Admin)
Delete a product.

**Endpoint**: `DELETE /products/:id`

**Access**: Admin Only

**Success Response** (200):
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🛒 Cart

### Get Cart
Get user's shopping cart.

**Endpoint**: `GET /cart`

**Access**: Protected

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "cart_item_id",
      "product": {
        "_id": "product_id",
        "name": "Product Name",
        "price": 89,
        ...
      },
      "quantity": 2,
      "size": "M"
    }
  ]
}
```

---

### Add to Cart
Add item to cart.

**Endpoint**: `POST /cart`

**Access**: Protected

**Request Body**:
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2,
  "size": "M"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [ ... ],
  "message": "Item added to cart"
}
```

---

### Update Cart Item
Update cart item quantity.

**Endpoint**: `PUT /cart/:itemId`

**Access**: Protected

**Request Body**:
```json
{
  "quantity": 3
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [ ... ],
  "message": "Cart updated"
}
```

---

### Remove from Cart
Remove item from cart.

**Endpoint**: `DELETE /cart/:itemId`

**Access**: Protected

**Success Response** (200):
```json
{
  "success": true,
  "data": [ ... ],
  "message": "Item removed from cart"
}
```

---

### Clear Cart
Clear entire cart.

**Endpoint**: `DELETE /cart`

**Access**: Protected

**Success Response** (200):
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## 📦 Orders

### Create Order
Place a new order.

**Endpoint**: `POST /orders`

**Access**: Protected

**Request Body**:
```json
{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "size": "M",
      "image": "image_url",
      "price": 89
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "Credit Card",
  "itemsPrice": 178,
  "shippingPrice": 25,
  "taxPrice": 17.8,
  "totalPrice": 220.8
}
```

**Success Response** (201):
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "user": "user_id",
    "orderItems": [ ... ],
    "shippingAddress": { ... },
    "paymentMethod": "Credit Card",
    "itemsPrice": 178,
    "shippingPrice": 25,
    "taxPrice": 17.8,
    "totalPrice": 220.8,
    "isPaid": false,
    "isDelivered": false,
    "status": "Pending",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### Get My Orders
Get authenticated user's orders.

**Endpoint**: `GET /orders/myorders`

**Access**: Protected

**Success Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [ ... ]
}
```

---

### Get Order by ID
Get specific order details.

**Endpoint**: `GET /orders/:id`

**Access**: Protected (Own orders) / Admin (All orders)

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    ...
  }
}
```

---

### Update Order to Paid
Mark order as paid.

**Endpoint**: `PUT /orders/:id/pay`

**Access**: Protected

**Request Body**:
```json
{
  "id": "payment_id",
  "status": "completed",
  "update_time": "2025-01-01T00:00:00Z",
  "email_address": "payer@example.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": { ... }
}
```

---

### Get All Orders (Admin)
Get all orders.

**Endpoint**: `GET /orders`

**Access**: Admin Only

**Success Response** (200):
```json
{
  "success": true,
  "count": 25,
  "data": [ ... ]
}
```

---

### Update Order Status (Admin)
Update order status and tracking.

**Endpoint**: `PUT /orders/:id/status`

**Access**: Admin Only

**Request Body**:
```json
{
  "status": "Shipped",
  "trackingNumber": "TRACK123456"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": { ... }
}
```

---

## 📧 Contact

### Submit Contact Form
Submit contact form.

**Endpoint**: `POST /contact`

**Access**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question about..."
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Your message has been sent successfully..."
}
```

---

## 📬 Subscription

### Subscribe to Newsletter
Subscribe to newsletter.

**Endpoint**: `POST /subscribe`

**Access**: Public

**Request Body**:
```json
{
  "email": "john@example.com",
  "source": "newsletter"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Thank you for subscribing!",
  "data": {
    "_id": "subscription_id",
    "email": "john@example.com",
    "isActive": true,
    "source": "newsletter"
  }
}
```

---

### Unsubscribe
Unsubscribe from newsletter.

**Endpoint**: `POST /subscribe/unsubscribe`

**Access**: Public

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "You have been unsubscribed successfully..."
}
```

---

### Get All Subscribers (Admin)
Get all active subscribers.

**Endpoint**: `GET /subscribe`

**Access**: Admin Only

**Success Response** (200):
```json
{
  "success": true,
  "count": 150,
  "data": [ ... ]
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized as admin"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error message"
}
```

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Add to Cart (Protected)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId":"PRODUCT_ID","quantity":1,"size":"M"}'
```

---

## 📚 Additional Resources

- [Postman Collection](link-to-postman-collection)
- [API Status Page](http://localhost:5000/api/health)
- [Server README](server/README.md)

---

**API Version**: 1.0.0

**Last Updated**: January 2025




