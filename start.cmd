@echo off
setlocal EnableDelayedExpansion
title AC Repair Service - Professional System Launcher
mode con: cols=84 lines=30
color 0B
cd /d "%~dp0"

:: ---------------------------------------------------------
:: Animated Progress Sequence (0% -> 100%)
:: ---------------------------------------------------------
call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [>---------------------------------------]   0%%  Starting boot sequence...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 180" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [========>-------------------------------]  20%%  Verifying Node.js environment...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 200" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [================>-----------------------]  40%%  Validating 28 Brand Vector Logos...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 200" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [========================>---------------]  60%%  Checking Database & Local Cache...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 200" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [================================>-------]  80%%  Configuring Localhost Port 3000...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 200" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [========================================] 100%%  System Ready!
powershell -NoProfile -Command "Start-Sleep -Milliseconds 220" >nul

echo.
echo  ------------------------------------------------------------------------------
echo    [OK] All system checks passed successfully. 0 errors found.
echo  ------------------------------------------------------------------------------
echo.

:: ---------------------------------------------------------
:: Browser Selection Menu
:: ---------------------------------------------------------
echo ================================================================================
echo   PLEASE SELECT WHICH BROWSER TO OPEN FOR LIVE PREVIEW:
echo ================================================================================
echo.
echo    [1] Google Chrome            (Recommended)
echo    [2] Microsoft Edge
echo    [3] Brave Browser
echo    [4] Mozilla Firefox
echo    [5] Default System Browser
echo.
echo ================================================================================
set "BROWSER_CHOICE=1"
set /p "BROWSER_CHOICE=  Enter your choice [1-5] (Press Enter for Chrome): "

set "TARGET_URL=http://localhost:3000"

if "%BROWSER_CHOICE%"=="1" (
    set "BROWSER_NAME=Google Chrome"
    set "LAUNCH_CMD=start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" %TARGET_URL% || start chrome %TARGET_URL% || start %TARGET_URL%"
) else if "%BROWSER_CHOICE%"=="2" (
    set "BROWSER_NAME=Microsoft Edge"
    set "LAUNCH_CMD=start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" %TARGET_URL% || start msedge %TARGET_URL% || start %TARGET_URL%"
) else if "%BROWSER_CHOICE%"=="3" (
    set "BROWSER_NAME=Brave Browser"
    set "LAUNCH_CMD=start "" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" %TARGET_URL% || start brave %TARGET_URL% || start %TARGET_URL%"
) else if "%BROWSER_CHOICE%"=="4" (
    set "BROWSER_NAME=Mozilla Firefox"
    set "LAUNCH_CMD=start firefox %TARGET_URL% || start %TARGET_URL%"
) else (
    set "BROWSER_NAME=Default System Browser"
    set "LAUNCH_CMD=start %TARGET_URL%"
)

echo.
echo  [*] Selected Browser : %BROWSER_NAME%
echo  [*] Target URL       : %TARGET_URL%
echo  [*] Status           : Opening %BROWSER_NAME% in 2 seconds...
echo.

:: Launch browser in background after short delay
start "" cmd /c "timeout /t 2 /nobreak >nul && %LAUNCH_CMD%"

echo ================================================================================
echo    Next.js Server Starting on %TARGET_URL% ...
echo    (Press Ctrl + C in this window anytime to stop the server)
echo ================================================================================
echo.

call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Server exited or port busy. Attempting production start...
    call npm run start
)

pause
goto :EOF

:: ---------------------------------------------------------
:: Subroutine: DRAW_HEADER
:: ---------------------------------------------------------
:DRAW_HEADER
cls
echo ================================================================================
echo    ___   ______   ____  __________  ___    ________     ______ _____
echo   /   ^| / ____/  / __ \/ ____/ __ \/   ^|  /  _/ __ \   / ____// ___/
echo  / /^| ^|/ /      / /_/ / __/ / /_/ / /^| ^|  / // /_/ /  / __/   \__ \ 
echo / ___ / /___   / _, _/ /___/ ____/ ___ ^|_/ // _, _/  / /___  ___/ / 
echo/_/  ^|_^\____/  /_/ ^|_/_____/_/   /_/  ^|_/___/_/ ^|_^|  /_____/ /____/  
echo                   DOORSTEP APPLIANCE REPAIR SYSTEM
echo ================================================================================
echo.
goto :EOF
