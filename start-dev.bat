@echo off
echo.
echo ========================================
echo  Starting MERN E-Commerce Application
echo ========================================
echo.

REM Start Backend Server
echo [1/2] Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 2 /nobreak >nul

REM Start Frontend Server
echo [2/2] Starting Frontend Server (Port 5173)...
start "Frontend Server" cmd /k "cd project && npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window (servers will keep running)...
pause >nul




