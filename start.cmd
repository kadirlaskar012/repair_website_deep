@echo off
title AC Repair Service - Live Preview
cd /d "%~dp0"

echo ================================================================
echo        AC REPAIR SERVICE - ONE-CLICK LIVE PREVIEW
echo ================================================================
echo.
echo [*] Project Directory: %~dp0
echo [*] Local URL:         http://localhost:3000
echo.
echo [1/2] Opening website in your default browser...
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

echo [2/2] Starting Next.js server...
echo.
echo (Press Ctrl + C in this window anytime to stop the server)
echo ================================================================
echo.

call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Server exited with error. Trying npm start...
    call npm run start
)

pause
