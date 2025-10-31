# E-Commerce Backend API

Backend for D2C E-Commerce Clothing Export Business built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: Full CRUD operations for products (Admin only)
- **Shopping Cart**: Persistent cart functionality for authenticated users
- **Order Management**: Complete order processing and tracking system
- **Contact Form**: Email notifications via Nodemailer
- **Newsletter Subscription**: Subscription management system
- **Image Upload**: Cloudinary integration for product images
- **Payment Gateway**: Stripe integration stubs (ready to implement)

## 📁 Project Structure

```
server/
├── app.js                    # Express app entry point
├── config/
│   ├── db.js                # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── models/
│   ├── User.js              # User model
│   ├── Product.js           # Product model
│   ├── Order.js             # Order model
│   └── Subscription.js      # Subscription model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── productRoutes.js     # Product routes
│   ├── cartRoutes.js        # Cart routes
│   ├── orderRoutes.js       # Order routes
│   ├── contactRoutes.js     # Contact form routes
│   └── subscriptionRoutes.js # Subscription routes
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── productController.js # Product logic
│   ├── cartController.js    # Cart logic
│   ├── orderController.js   # Order logic
│   ├── contactController.js # Contact logic
│   └── subscriptionController.js # Subscription logic
├── middleware/
│   ├── authMiddleware.js    # JWT verification & admin check
│   └── errorMiddleware.js   # Error handling
└── utils/
    └── seedData.js          # Database seeding script
```

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=your_mongodb_atlas_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourstore.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `.env` as `MONGO_URI`
4. Whitelist your IP address or allow access from anywhere

### 4. Seed Database (Optional)

```bash
node utils/seedData.js
```

This creates:
- Admin user (email: admin@ecommerce.com, password: admin123)
- 8 sample products

### 5. Start Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login user |
| GET | `/profile` | Private | Get user profile |
| PUT | `/profile` | Private | Update user profile |

### Products (`/api/products`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all products (with filters) |
| GET | `/featured` | Public | Get featured products |
| GET | `/:id` | Public | Get product by ID |
| POST | `/` | Admin | Create new product |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Delete product |

### Cart (`/api/cart`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Private | Get user's cart |
| POST | `/` | Private | Add item to cart |
| PUT | `/:itemId` | Private | Update cart item quantity |
| DELETE | `/:itemId` | Private | Remove item from cart |
| DELETE | `/` | Private | Clear cart |

### Orders (`/api/orders`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Private | Create new order |
| GET | `/myorders` | Private | Get user's orders |
| GET | `/:id` | Private | Get order by ID |
| PUT | `/:id/pay` | Private | Mark order as paid |
| GET | `/` | Admin | Get all orders |
| PUT | `/:id/status` | Admin | Update order status |

### Contact (`/api/contact`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Submit contact form |

### Subscription (`/api/subscribe`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Subscribe to newsletter |
| POST | `/unsubscribe` | Public | Unsubscribe |
| GET | `/` | Admin | Get all subscribers |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## 🧪 Testing API

Use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- Thunder Client (VS Code extension)

## 📧 Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate App Password: Google Account > Security > App Passwords
3. Use app password in `EMAIL_PASSWORD`

## 🚢 Deployment

### Railway / Render / Heroku

1. Push code to GitHub
2. Connect repository to platform
3. Add environment variables
4. Deploy

### Environment Variables Needed:
- `PORT`
- `NODE_ENV=production`
- `MONGO_URI`
- `JWT_SECRET`
- All other optional services

## 📝 Notes

- Default admin credentials: `admin@ecommerce.com` / `admin123` (change immediately!)
- Email and Cloudinary features are optional
- Payment gateway integration is stubbed - implement as needed
- Remember to whitelist deployment IP in MongoDB Atlas

## 🤝 Support

For issues or questions, check the API health endpoint:
```
GET http://localhost:5000/api/health
```

## 📄 License

MIT




