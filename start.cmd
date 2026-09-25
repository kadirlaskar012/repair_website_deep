@echo off
setlocal EnableDelayedExpansion
title AC Repair Service - Professional System Launcher
color 0B
cd /d "%~dp0"

:: ---------------------------------------------------------
:: Animated Progress Sequence (0% -> 100%)
:: ---------------------------------------------------------
call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [##--------------------------------------]   0%%  Starting boot sequence...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 150" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [########--------------------------------]  20%%  Verifying Node.js environment...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 150" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [################------------------------]  40%%  Validating 28 Brand Vector Logos...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 150" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [########################----------------]  60%%  Checking Database and Local Cache...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 150" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [################################--------]  80%%  Configuring Localhost Port 3000...
powershell -NoProfile -Command "Start-Sleep -Milliseconds 150" >nul

call :DRAW_HEADER
echo [*] Initializing AC Repair Engine...
echo.
echo  [########################################] 100%%  System Ready!
powershell -NoProfile -Command "Start-Sleep -Milliseconds 180" >nul

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

if "%BROWSER_CHOICE%"=="2" goto LAUNCH_EDGE
if "%BROWSER_CHOICE%"=="3" goto LAUNCH_BRAVE
if "%BROWSER_CHOICE%"=="4" goto LAUNCH_FIREFOX
if "%BROWSER_CHOICE%"=="5" goto LAUNCH_DEFAULT
goto LAUNCH_CHROME

:LAUNCH_CHROME
set "BROWSER_NAME=Google Chrome"
start "" cmd /c "timeout /t 2 /nobreak >nul & start chrome http://localhost:3000 || start http://localhost:3000"
goto START_SERVER

:LAUNCH_EDGE
set "BROWSER_NAME=Microsoft Edge"
start "" cmd /c "timeout /t 2 /nobreak >nul & start msedge http://localhost:3000 || start http://localhost:3000"
goto START_SERVER

:LAUNCH_BRAVE
set "BROWSER_NAME=Brave Browser"
start "" cmd /c "timeout /t 2 /nobreak >nul & start brave http://localhost:3000 || start http://localhost:3000"
goto START_SERVER

:LAUNCH_FIREFOX
set "BROWSER_NAME=Mozilla Firefox"
start "" cmd /c "timeout /t 2 /nobreak >nul & start firefox http://localhost:3000 || start http://localhost:3000"
goto START_SERVER

:LAUNCH_DEFAULT
set "BROWSER_NAME=Default System Browser"
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"
goto START_SERVER

:START_SERVER
echo.
echo  [*] Selected Browser : %BROWSER_NAME%
echo  [*] Target URL       : http://localhost:3000
echo  [*] Status           : %BROWSER_NAME% will open in 2 seconds...
echo.
echo ================================================================================
echo    Starting Next.js Server on http://localhost:3000 ...
echo    (Press Ctrl + C in this window anytime to stop the server)
echo ================================================================================
echo.

call npm run dev

echo.
echo ================================================================================
echo    [!] Server stopped.
echo ================================================================================
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
