@echo off
echo ===========================================
echo 🚀 DEPLOYING NOTION AI SAAS DASHBOARD
echo ===========================================
echo.

cd /d "c:\Users\shantanu shaswat\OneDrive\Desktop\notion ai"

echo 📦 Installing dependencies...
npm install

echo 🔧 Building project...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

echo 📦 Installing Vercel CLI...
npm install -g vercel

echo 🔐 Logging into Vercel...
vercel login

echo 🚀 Deploying to production...
vercel --prod

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo.
echo 🎯 Your live URL: https://notion-ai-saas.vercel.app
echo.
echo 🌟 Features Live:
echo   • Real client management (CRUD)
echo   • Live dashboard with real metrics
echo   • Analytics with actual data
echo   • Conversion funnel from real clients
echo.
pause