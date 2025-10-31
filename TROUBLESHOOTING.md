# 🔧 Troubleshooting Guide

## ❌ Common Errors & Solutions

### 1. **npm error: Could not read package.json**

**Error Message:**
```
npm error path C:\Users\muham\package.json
npm error enoent Could not read package.json
```

**Cause:** Running npm commands from wrong directory

**Solution:**
```bash
# For Backend:
cd "E:\Downloads\project ecom\server"
npm run dev

# For Frontend:
cd "E:\Downloads\project ecom\project"
npm run dev
```

**Easy Way:** Double-click `start-dev.bat` in the root folder!

---

### 2. **MongoDB Connection Error**

**Error Message:**
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```

**Cause:** MongoDB Atlas URI not configured or wrong

**Solution:**

1. **Get MongoDB Atlas URI:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign in/Create account
   - Create a cluster (free M0 tier)
   - Click "Connect" → "Connect your application"
   - Copy connection string

2. **Update `.env` file in `server` folder:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
   Replace `username` and `password` with your actual credentials

3. **Restart backend server**

---

### 3. **Port Already in Use**

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

**Option A - Kill the process:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (replace PID with actual number)
taskkill /PID <PID> /F
```

**Option B - Change port:**
Edit `server/.env`:
```env
PORT=5001
```

---

### 4. **Frontend Can't Connect to Backend**

**Error in Browser Console:**
```
Failed to fetch
Network Error
```

**Solutions:**

✅ **Check backend is running:**
- Open http://localhost:5000/api/health
- Should see: `{"status":"OK"}`

✅ **Check frontend `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

✅ **Restart both servers**

---

### 5. **Module Not Found Errors**

**Error Message:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Backend
cd server
npm install

# Frontend
cd project
npm install
```

---

### 6. **JWT Authentication Fails**

**Error:**
```
Not authorized, token failed
```

**Solutions:**

1. **Check JWT_SECRET is set** in `server/.env`:
   ```env
   JWT_SECRET=your_secret_key_here
   ```

2. **Clear browser localStorage:**
   - Open DevTools (F12)
   - Application tab → Local Storage
   - Clear all

3. **Login again**

---

### 7. **CORS Errors**

**Error in Browser:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

Check `server/.env` has correct frontend URL:
```env
FRONTEND_URL=http://localhost:5173
```

Restart backend server.

---

## 🚀 Quick Start Checklist

Before running the app, ensure:

### Backend (`server` folder):
- [ ] `node_modules` folder exists (if not: `npm install`)
- [ ] `.env` file exists with:
  - [ ] `MONGO_URI` configured
  - [ ] `JWT_SECRET` set
  - [ ] `PORT=5000`
  - [ ] `FRONTEND_URL=http://localhost:5173`

### Frontend (`project` folder):
- [ ] `node_modules` folder exists (if not: `npm install`)
- [ ] `.env` file exists with:
  - [ ] `VITE_API_URL=http://localhost:5000/api`

---

## 🔍 How to Check if Servers are Running

### Check Backend:
```bash
# In browser or terminal:
curl http://localhost:5000/api/health

# Should return:
{"status":"OK","message":"Server is running"}
```

### Check Frontend:
- Open browser: http://localhost:5173
- Should see the homepage

---

## 📝 Viewing Logs

### Backend Logs:
Look at the terminal where backend is running. Should see:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running in development mode on port 5000
```

### Frontend Logs:
Look at the terminal where frontend is running. Should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## 🆘 Still Having Issues?

### Step 1: Stop All Servers
Press `Ctrl+C` in both terminal windows

### Step 2: Clean Start
```bash
# Backend
cd server
npm install
npm run dev

# Frontend (in new terminal)
cd project
npm install  
npm run dev
```

### Step 3: Test Backend First
Open http://localhost:5000/api/health
- If this works → Backend is OK
- If not → Check MongoDB connection

### Step 4: Test Frontend
Open http://localhost:5173
- If this works → Frontend is OK
- If not → Check console for errors

---

## 📧 Common Email Service Errors

If contact form doesn't work:

1. Email configuration is **OPTIONAL**
2. Backend will log error but continue working
3. To fix: Add Gmail app password to `server/.env`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

---

## 🔑 Default Credentials (After Seeding)

**Admin Login:**
- Email: `admin@ecommerce.com`
- Password: `admin123`

**To Seed Database:**
```bash
cd server
node utils/seedData.js
```

---

## 💡 Pro Tips

1. **Always run commands from correct directory**
2. **Check which port is being used** (5000 for backend, 5173 for frontend)
3. **MongoDB Atlas free tier is enough** for development
4. **Clear browser cache** if seeing old data
5. **Use two separate terminal windows** (one for backend, one for frontend)
6. **Use the `start-dev.bat` script** for easy startup

---

## 📊 System Requirements

- Node.js v16 or higher
- npm v8 or higher
- 4GB RAM minimum
- Internet connection (for MongoDB Atlas)

Check versions:
```bash
node --version
npm --version
```

---

## 🔄 Restart Commands

**Backend:**
1. Press `Ctrl+C` in backend terminal
2. Run: `npm run dev`

**Frontend:**
1. Press `Ctrl+C` in frontend terminal
2. Run: `npm run dev`

**Both (Easy Way):**
- Close all terminals
- Double-click `start-dev.bat`

---

**Need more help? Check:**
- `README.md` - Full documentation
- `STARTUP_GUIDE.md` - Detailed setup
- `API_DOCUMENTATION.md` - API reference




