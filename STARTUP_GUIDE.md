# 🚀 Quick Start Guide - MERN E-Commerce Application

This guide will help you get the application up and running in minutes.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js installed (v16 or higher) - [Download](https://nodejs.org/)
- [ ] MongoDB Atlas account - [Sign up](https://www.mongodb.com/cloud/atlas)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command prompt
- [ ] Gmail account (for email functionality - optional)

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Backend Dependencies

Open terminal and navigate to server directory:

```bash
cd server
npm install
```

### Step 2: Configure Backend Environment

Create a `.env` file in the `server` directory with these settings:

**Minimum Required Configuration:**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=mysupersecretkey12345
FRONTEND_URL=http://localhost:5173
```

**Optional (for email features):**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@yourstore.com
```

### Step 3: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" or "Sign In"
3. Create a new project (e.g., "ECommerce")
4. Build a cluster (Free tier is fine)
5. Click "Connect" > "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Replace `<username>` with your database username
9. Paste into `MONGO_URI` in your `.env` file

### Step 4: Seed Database with Sample Data

```bash
node utils/seedData.js
```

This creates:
- 8 sample products
- 1 admin user (email: admin@ecommerce.com, password: admin123)

### Step 5: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running in development mode on port 5000
```

### Step 6: Install Frontend Dependencies

Open a NEW terminal window and navigate to project directory:

```bash
cd project
npm install
```

### Step 7: Configure Frontend Environment

Create a `.env` file in the `project` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 8: Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 9: Open Application

Open your browser and go to:
```
http://localhost:5173
```

## 🎉 You're Done!

You should now see the e-commerce application running!

## 🔑 Test Admin Features

1. Click "Login" in the navigation
2. Use these credentials:
   - Email: `admin@ecommerce.com`
   - Password: `admin123`
3. You can now access admin features through the API

## 🧪 Test the Application

### As a Regular User:
1. Register a new account
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Submit contact form
6. Subscribe to newsletter

### As an Admin (via API):
Use tools like Postman or Thunder Client to:
- Create new products
- Update existing products
- Delete products
- View all orders
- Update order status

## ❓ Troubleshooting

### Backend won't start?
- ✅ Check if MongoDB connection string is correct
- ✅ Ensure MongoDB Atlas IP whitelist includes your IP
- ✅ Verify port 5000 is not already in use

### Frontend can't connect to backend?
- ✅ Ensure backend is running on port 5000
- ✅ Check `VITE_API_URL` in frontend `.env` file
- ✅ Verify CORS is enabled in backend

### Can't login?
- ✅ Make sure you ran the seed script
- ✅ Check MongoDB contains user data
- ✅ Verify JWT_SECRET is set in backend `.env`

### Email not sending?
- ✅ Email features are optional
- ✅ Check Gmail app password is correct
- ✅ Enable "Less secure app access" if needed

## 📱 Access from Mobile Device

1. Find your computer's local IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`

2. Update backend `.env`:
```env
FRONTEND_URL=http://YOUR_IP:5173
```

3. Start backend with:
```bash
npm run dev
```

4. Start frontend with:
```bash
npm run dev -- --host
```

5. Access on mobile:
```
http://YOUR_IP:5173
```

## 🔧 Common Commands

### Backend
```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start

# Seed database
node utils/seedData.js
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Next Steps

1. **Customize Products**: Update seed data with your products
2. **Configure Email**: Set up Gmail app password for email features
3. **Update Branding**: Change logo and colors in CSS
4. **Add Images**: Configure Cloudinary for image uploads
5. **Deploy**: Follow deployment guide in main README

## 🆘 Need Help?

- Check main `README.md` for detailed documentation
- Review API endpoints in server `README.md`
- Check browser console for errors
- Review server terminal for error messages

## 🎯 Important Notes

- **Security**: Change admin password immediately
- **Environment Variables**: Never commit `.env` files
- **MongoDB**: Whitelist IPs in MongoDB Atlas Network Access
- **Email**: Gmail app passwords are different from account password
- **Production**: Use stronger JWT secrets in production

## ✅ Checklist Before Moving to Production

- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Configure production MongoDB cluster
- [ ] Set up proper email service
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up proper error logging
- [ ] Configure backup strategy
- [ ] Test all features thoroughly
- [ ] Set up monitoring

---

**Happy Building! 🚀**

If you encounter any issues, please refer to the troubleshooting section or check the main README for more details.











