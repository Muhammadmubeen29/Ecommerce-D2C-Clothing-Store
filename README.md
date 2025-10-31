# 🛍️ D2C E-Commerce Clothing Export Business - MERN Stack

A complete full-stack e-commerce application for a Direct-to-Consumer (D2C) clothing export business. Built with React.js (Vite), Node.js, Express, and MongoDB Atlas.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Beautiful, responsive design using Tailwind CSS
- **Product Catalog**: Browse products with filtering by category and price
- **Product Details**: Detailed product pages with size selection and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Register, login, and profile management
- **Checkout Process**: Complete order placement with shipping details
- **Contact Form**: Get in touch with the business
- **Newsletter Subscription**: Subscribe to updates and offers

### Backend Features
- **RESTful API**: Clean, modular API architecture
- **JWT Authentication**: Secure user authentication and authorization
- **User Management**: Register, login, profile updates
- **Product Management**: CRUD operations for products (Admin)
- **Cart Management**: Persistent cart for logged-in users
- **Order Management**: Create orders, track status, order history
- **Email Integration**: Contact form and newsletter with Nodemailer
- **MongoDB Integration**: Robust database with Mongoose ODM
- **Admin Controls**: Admin-only routes for product and order management

## 📁 Project Structure

```
project-ecom/
├── project/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── context/          # React Context (Auth)
│   │   ├── config/           # Configuration files
│   │   ├── types.ts          # TypeScript types
│   │   └── App.tsx           # Main app component
│   └── package.json
│
└── server/                    # Backend (Node.js + Express)
    ├── config/               # Database & external service configs
    ├── models/               # Mongoose schemas
    ├── controllers/          # Route controllers
    ├── routes/               # API routes
    ├── middleware/           # Custom middleware
    ├── utils/                # Utility functions
    ├── app.js                # Express app entry point
    └── package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB Atlas** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email services
- **Cloudinary** for image uploads (optional)
- **CORS** for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-ecom
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_atlas_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourstore.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

Seed the database (optional):
```bash
node utils/seedData.js
```

Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../project
npm install
```

Create a `.env` file in the `project` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔑 Default Admin Credentials

After seeding the database:
- **Email**: admin@ecommerce.com
- **Password**: admin123

**⚠️ Important**: Change these credentials immediately in production!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Contact & Subscription
- `POST /api/contact` - Submit contact form
- `POST /api/subscribe` - Subscribe to newsletter
- `POST /api/subscribe/unsubscribe` - Unsubscribe
- `GET /api/subscribe` - Get all subscribers (Admin)

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to platform
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=your_backend_url/api`
5. Deploy

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Whitelist deployment server IPs

## 📧 Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate App Password: Google Account > Security > App Passwords
3. Use app password in `EMAIL_PASSWORD` environment variable

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes and admin authorization
- Input validation
- CORS configuration
- Environment variable usage for sensitive data

## 🎨 UI/UX Features

- Fully responsive design (mobile, tablet, desktop)
- Modern, clean interface
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation
- Product filtering and search
- User-friendly forms

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node utils/seedData.js` - Seed database

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Register a new user or use admin credentials
3. Browse products and add items to cart
4. Proceed to checkout and place an order
5. Test contact form functionality
6. Subscribe to newsletter

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions:
- Check the API health endpoint: `GET http://localhost:5000/api/health`
- Review server logs for errors
- Ensure all environment variables are set correctly
- Verify MongoDB connection

## 🎯 Future Enhancements

- [ ] Real payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking system
- [ ] Advanced search and filters
- [ ] Social media authentication
- [ ] Multi-language support
- [ ] Admin dashboard UI
- [ ] Analytics and reporting
- [ ] Email order confirmations

## 👥 Credits

Built with ❤️ for D2C E-Commerce Clothing Export Business

---

**Happy Coding! 🚀**




