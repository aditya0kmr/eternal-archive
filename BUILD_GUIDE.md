BUILD_GUIDE.md# 🔨 Build & Deploy Guide - Phase 3.1 Deployment

## 📋 Overview

This guide walks you through building the React/Vite project locally and deploying Phase 3.1 to GitHub Pages, replacing the Phase 2 version currently live.

---

## ✅ Prerequisites Check

Before starting, verify you have:
- ✅ Node.js v18+ installed
- ✅ npm installed
- ✅ Git installed
- ✅ Access to terminal/PowerShell
- ✅ Repository cloned locally

---

## 🚀 Step-by-Step Build Process

### **Step 1: Clone Repository**
```bash
git clone https://github.com/aditya0kmr/eternal-archive.git
cd eternal-archive
```

### **Step 2: Install Dependencies**
```bash
npm install
```
**What this does**:
- Downloads all packages from package.json
- Installs React 18, Vite, R3F, Drei, Zustand, Firebase (when ready)
- Creates `node_modules/` folder (~500MB, already in .gitignore)
- Generates `package-lock.json` for version consistency

**Expected time**: 2-5 minutes

### **Step 3: Test Development Server (Optional)**
```bash
npm run dev
```
**What this does**:
- Starts Vite dev server at `http://localhost:5173`
- Hot-reloads on file changes
- Shows React component mounting

**To test**:
1. Open browser to http://localhost:5173
2. You should see the React/R3F scene
3. Check browser console (F12) for any errors
4. Press `Ctrl+C` in terminal to stop server

### **Step 4: Build for Production**
```bash
npm run build
```

**What this does**:
- Bundles React, Vite, R3F code
- Minifies and optimizes all files
- Creates `/dist` folder with production build
- Outputs build summary:
  ```
  dist/index.html         2.5 kB
  dist/assets/main.*.js   150 kB (gzipped: 45 kB)
  dist/assets/style.*.css 12 kB (gzipped: 3 kB)
  ```

**Expected time**: 30-60 seconds

### **Step 5: Preview Production Build (Optional)**
```bash
npm run preview
```

**What this does**:
- Serves production build locally
- Shows how it will appear on GitHub Pages
- Visit http://localhost:4173

**To test**:
1. Open browser to http://localhost:4173
2. Verify React components render
3. Check console for errors
4. Press `Ctrl+C` to stop

### **Step 6: Commit Build Files**
```bash
git add dist/
git commit -m "build: Generate Phase 3.1 production build"
git push origin main
```

**What happens**:
- Uploads `dist/` folder to GitHub
- GitHub Actions detects push
- Workflow triggers automatic deployment
- Wait 1-2 minutes for GitHub Pages to publish

---

## 🎯 Deployment Verification

### **Check 1: GitHub Deployments**
1. Go to https://github.com/aditya0kmr/eternal-archive/deployments
2. Look for new "github-pages" deployment
3. Should show green checkmark after 1-2 min

### **Check 2: Live Site**
1. Visit https://aditya0kmr.github.io/eternal-archive/
2. **Before**: You see Phase 2 (3 gears + particles)
3. **After**: You should see Phase 3.1 (React version with ChronometricKey)

### **Check 3: Browser Console**
1. Press F12 to open Dev Tools
2. Go to Console tab
3. Should show:
   ```
   [Vite] connected. ✓
   React version: 18.x.x
   ChronometricKey component mounted
   ```
4. NO red errors

---

## 🐛 Troubleshooting

### **Error: npm: command not found**
- **Fix**: Install Node.js from https://nodejs.org/

### **Error: Module not found**
```
Error: Cannot find module 'react'
```
- **Fix**: Run `npm install` again

### **Build takes too long**
- **Fix**: This is normal first time. Subsequent builds cache better.

### **Port 5173 already in use**
```
error: listen EADDRINUSE: address already in use :::5173
```
- **Fix**: Kill the process:
  ```bash
  # Windows
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -i :5173
  kill <PID>
  ```

### **Deployment stuck/not updating**
- **Fix**: Clear GitHub Pages cache
  1. Go to Settings → Pages
  2. Change source to "GitHub Actions"
  3. Change back to current setting
  4. Wait 2-3 minutes

---

## 📊 What Gets Built

### **dist/ Folder Contents**
```
dist/
├── index.html          (Entry point, references JS/CSS)
├── vite.svg           (Vite logo)
└── assets/
    ├── index-*.js     (Minified React + Vite + R3F code)
    └── index-*.css    (Minified global + component styles)
```

### **File Sizes (Estimated)**
- Before gzip: ~180 kB
- After gzip: ~50 kB
- Much smaller than Phase 2 (was ~250 kB)

---

## 🔄 Update Cycle (Future)

Once Phase 3.1 is live, updating is simple:

```bash
# Make changes to src/ files
git add src/
git commit -m "feat: Add new feature"

# Build and deploy
npm run build
git add dist/
git commit -m "build: Update production build"
git push origin main
```

GitHub Pages automatically deploys within 1-2 minutes.

---

## ✨ Next Phases (After Phase 3.1 Live)

### **Phase 3.2: Implement Temporal Loom**
- Add milestone timeline component
- Connect to memory data store
- Add 3D visualization

### **Phase 3.3: Implement Memory Press**
- Photo gallery component
- Image loading from Firestore
- Caption system

### **Phase 3.4: Implement Dual Coil Capacitor**
- Letter display mechanism
- Firestore integration for love letters
- Encryption/decryption logic

### **Phase 4: Full Feature Integration**
- Firebase Auth (user login)
- Real Firestore data
- Mood tracking system
- Share functionality

---

## 📝 Checklist Before Building

- [ ] Repository cloned locally
- [ ] `node_modules/` folder exists (after npm install)
- [ ] No uncommitted changes (git status clean)
- [ ] Phase 2 deployed and working
- [ ] TEST_PLAN.md reviewed
- [ ] Ready to replace Phase 2

---

## 🎉 Success Criteria

After deployment, verify:

✅ **Deployment page** shows green checkmark  
✅ **Live site** loads at https://aditya0kmr.github.io/eternal-archive/  
✅ **React app** renders (ChronometricKey visible)  
✅ **No console errors** (F12 Dev Tools)  
✅ **Smooth animations** (gears rotating, scene rendering)  
✅ **Responsive** on mobile and desktop  

---

## 🚨 Rollback Plan

If Phase 3.1 has issues after deployment:

```bash
# Revert to Phase 2 (restore old version)
git revert HEAD
git push origin main

# OR manually rebuild Phase 2
git checkout HEAD~1 dist/
git add dist/
git commit -m "revert: Restore Phase 2 version"
git push origin main
```

---

## 📞 Support

If you encounter issues:
1. Check terminal output for error messages
2. Review browser console (F12)
3. Check GitHub Actions logs
4. Refer to TEST_PLAN.md for verification steps

---

**Status**: Ready to build  
**Date**: December 17, 2025  
**Phase**: 3.1 Build & Deployment
