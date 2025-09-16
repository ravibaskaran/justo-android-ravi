# Deployment Documentation

## Executive Summary

This document provides comprehensive deployment instructions for the Justo Real Estate Field Worker application across all supported platforms (Android, iOS, and Web). It includes build configurations, environment setup, CI/CD pipeline recommendations, and production deployment strategies.

## Build Configuration Overview

### **Technology Stack**
```
┌─────────────────────────────────────────────────────────────────┐
│                    Justo Deployment Stack                      │
├─────────────────────────────────────────────────────────────────┤
│ React Native: 0.76.0                                           │
│ Node.js: >=18 (Required)                                       │
│ Package Manager: Yarn 3.6.4                                    │
│ Bundle Tools: Metro (Mobile) + Webpack (Web)                   │
│ Build Tools: Gradle (Android) + Xcode (iOS)                    │
│ Languages: TypeScript 5.0.4 + JavaScript                      │
└─────────────────────────────────────────────────────────────────┘
```

### **Build Scripts Summary**
```json
{
  "android": "react-native run-android",
  "ios": "react-native run-ios", 
  "start": "react-native start",
  "web": "webpack serve",
  "web:build": "webpack --mode=production",
  "build": "cd android && gradlew clean && gradlew assembleRelease && cd ..",
  "release": "cd android && gradlew clean && gradlew bundleRelease && cd ..",
  "lint": "eslint .",
  "test": "jest"
}
```

## Development Environment Setup

### **Prerequisites Installation**
```bash
# Node.js (Required: >=18)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Yarn Package Manager
npm install -g yarn@3.6.4

# React Native CLI
npm install -g @react-native-community/cli@15.0.0-alpha.2

# For Android Development
# Install Android Studio with SDK 35
# Install SDK Build-Tools 35.0.0
# Set ANDROID_HOME environment variable

# For iOS Development (macOS only)
# Install Xcode 15+
# Install iOS Simulator
# Install CocoaPods: sudo gem install cocoapods
```

### **Project Setup**
```bash
# Clone repository
git clone <repository-url>
cd justo

# Install dependencies
yarn install

# iOS specific setup (macOS only)
cd ios && pod install && cd ..

# Verify React Native setup
npx react-native doctor

# Start Metro bundler
yarn start
```

### **Firebase Configuration Setup**
```bash
# Android Firebase Setup
# 1. Download google-services.json from Firebase Console
# 2. Place in android/app/google-services.json

# iOS Firebase Setup  
# 1. Download GoogleService-Info.plist from Firebase Console
# 2. Add to iOS project in Xcode

# Environment Variables Required
export FIREBASE_PROJECT_ID="justo-37d73"
export FIREBASE_DATABASE_URL="https://justo-37d73-default-rtdb.firebaseio.com"
```

## Platform-Specific Build Instructions

### **Android Development Build**
```bash
# Development build (Debug)
yarn android

# Alternative using React Native CLI
npx react-native run-android

# Specific device/emulator
npx react-native run-android --device="Device_Name"

# Clean build
cd android
./gradlew clean
cd ..
yarn android
```

### **Android Production Build**
```bash
# Generate Release APK
yarn build
# Or manually:
cd android
./gradlew clean
./gradlew assembleRelease
cd ..

# Generate Release Bundle (Recommended for Play Store)
yarn release
# Or manually:
cd android
./gradlew clean
./gradlew bundleRelease
cd ..

# Output locations:
# APK: android/app/build/outputs/apk/release/app-release.apk
# Bundle: android/app/build/outputs/bundle/release/app-release.aab
```

### **Android Build Configuration**
```gradle
// android/build.gradle
buildscript {
    ext {
        buildToolsVersion = "35.0.0"
        minSdkVersion = 24          // Supports Android 7.0+
        compileSdkVersion = 35      // Latest stable
        targetSdkVersion = 35       // Target latest
        ndkVersion = "26.1.10909125"
        kotlinVersion = "1.9.24"
    }
}

// android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file("release.keystore")
            storePassword System.getenv("STORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
}
```

### **iOS Development Build**
```bash
# Development build (Debug)
yarn ios

# Alternative using React Native CLI
npx react-native run-ios

# Specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"

# Clean build
cd ios
rm -rf build/
xcodebuild clean -workspace justo.xcworkspace -scheme justo
cd ..
yarn ios
```

### **iOS Production Build**
```bash
# Build for Device (requires Apple Developer Account)
npx react-native run-ios --device --configuration Release

# Archive for App Store (using Xcode)
# 1. Open ios/justo.xcworkspace in Xcode
# 2. Product → Archive
# 3. Distribute App → App Store Connect

# Alternative using command line
cd ios
xcodebuild -workspace justo.xcworkspace \
           -scheme justo \
           -configuration Release \
           -archivePath "justo.xcarchive" \
           archive
```

### **iOS Configuration Requirements**
```plist
<!-- ios/justo/Info.plist -->
<dict>
    <key>CFBundleDisplayName</key>
    <string>Justo</string>
    <key>CFBundleIdentifier</key>
    <string>com.justo.app</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    
    <!-- Firebase Configuration -->
    <key>FIREBASE_ANALYTICS_COLLECTION_ENABLED</key>
    <true/>
    
    <!-- Camera and Location Permissions -->
    <key>NSCameraUsageDescription</key>
    <string>This app needs access to camera for property documentation.</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>This app needs location access for property mapping.</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>This app needs photo library access for property images.</string>
</dict>
```

### **Web Development Build**
```bash
# Development server
yarn web
# Starts webpack dev server at http://localhost:5000

# Production build
yarn web:build
# Outputs to ./dist/ directory

# Serve production build locally
npx serve dist -p 5000
```

### **Web Configuration**
```javascript
// webpack.config.js highlights
module.exports = {
  entry: './index.web.js',
  mode: 'development', // Change to 'production' for optimized builds
  
  resolve: {
    alias: {
      // React Native to Web mappings
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      
      // Platform-specific stubs for web
      '@react-native-firebase/app': './web-stubs/Firebase.js',
      '@react-native-async-storage/async-storage': './web-stubs/AsyncStorage.js',
      'react-native-vector-icons': './web-stubs/VectorIcons.js'
    }
  },
  
  devServer: {
    port: 5000,
    host: '0.0.0.0', // Important: Allows external connections in Replit
    allowedHosts: 'all' // Important: Required for Replit proxy
  }
};
```

## Environment Configuration

### **Environment Variables**
```bash
# Create .env file for development
NODE_ENV=development
GLOBAL_URL=https://your-api-domain.com
FIREBASE_PROJECT_ID=justo-37d73
FIREBASE_DATABASE_URL=https://justo-37d73-default-rtdb.firebaseio.com

# Production Environment Variables
NODE_ENV=production
GLOBAL_URL=https://production-api-domain.com
STORE_PASSWORD=your_store_password
KEY_ALIAS=your_key_alias  
KEY_PASSWORD=your_key_password
```

### **Firebase Environment Setup**
```javascript
// Firebase configuration per environment
const firebaseConfig = {
  development: {
    projectId: "justo-37d73",
    databaseURL: "https://justo-37d73-default-rtdb.firebaseio.com",
    storageBucket: "justo-37d73.appspot.com"
  },
  production: {
    projectId: "justo-prod",
    databaseURL: "https://justo-prod-default-rtdb.firebaseio.com", 
    storageBucket: "justo-prod.appspot.com"
  }
};
```

### **API Environment Configuration**
```javascript
// Environment-specific API URLs
const apiConfig = {
  development: {
    baseURL: "https://dev-api.justoworks.co.in/api/",
    timeout: 30000
  },
  staging: {
    baseURL: "https://staging-api.justoworks.co.in/api/",
    timeout: 20000
  },
  production: {
    baseURL: "https://api.justoworks.co.in/api/", 
    timeout: 15000
  }
};
```

## Signing & Security Configuration

### **Android App Signing**
```bash
# Generate release keystore
keytool -genkeypair -v -storetype PKCS12 \
        -keystore release.keystore \
        -alias release-key \
        -keyalg RSA -keysize 2048 \
        -validity 10000

# Place keystore in android/app/release.keystore
# Configure signing in android/app/build.gradle
```

### **iOS Code Signing**
```bash
# Development Provisioning Profile Setup
# 1. Register device UDIDs in Apple Developer Console
# 2. Create/update provisioning profiles
# 3. Configure in Xcode: Signing & Capabilities

# Distribution Certificate (for App Store)
# 1. Create Distribution Certificate in Apple Developer Console  
# 2. Download and install in Keychain
# 3. Configure in Xcode for Release builds
```

### **Security Configuration**
```javascript
// Production security headers
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'"
};

// API security configuration
const apiSecurity = {
  timeout: 15000,
  maxRetries: 3,
  rateLimit: {
    max: 100,
    window: 60000
  }
};
```

## CI/CD Pipeline Configuration

### **GitHub Actions Workflow**
```yaml
# .github/workflows/build-and-deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Run tests
        run: yarn test
      
      - name: Run lint
        run: yarn lint

  build-android:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Setup Android SDK
        uses: android-actions/setup-android@v3
      
      - name: Build Android Release
        env:
          STORE_PASSWORD: ${{ secrets.STORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
        run: |
          echo "${{ secrets.RELEASE_KEYSTORE }}" | base64 -d > android/app/release.keystore
          yarn release
      
      - name: Upload Android Bundle
        uses: actions/upload-artifact@v4
        with:
          name: android-bundle
          path: android/app/build/outputs/bundle/release/app-release.aab

  build-ios:
    needs: test
    runs-on: macos-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Install Pods
        run: cd ios && pod install
      
      - name: Build iOS Archive
        run: |
          cd ios
          xcodebuild -workspace justo.xcworkspace \
                     -scheme justo \
                     -configuration Release \
                     -archivePath "justo.xcarchive" \
                     archive
      
      - name: Upload iOS Archive
        uses: actions/upload-artifact@v4
        with:
          name: ios-archive
          path: ios/justo.xcarchive

  build-web:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build Web
        run: yarn web:build
      
      - name: Upload Web Build
        uses: actions/upload-artifact@v4
        with:
          name: web-build
          path: dist/
```

### **Deployment Environments**
```yaml
# Environment-specific deployments
environments:
  development:
    url: https://dev.justoworks.co.in
    auto_deploy: true
    branch: develop
    
  staging:
    url: https://staging.justoworks.co.in  
    auto_deploy: false
    branch: main
    approval_required: true
    
  production:
    url: https://app.justoworks.co.in
    auto_deploy: false
    branch: main
    approval_required: true
    manual_release: true
```

## Performance Optimization

### **Bundle Size Optimization**
```javascript
// Metro bundle optimization
module.exports = {
  transformer: {
    minifierConfig: {
      mangle: { toplevel: true },
      output: {
        ascii_only: true,
        quote_style: 3,
        wrap_iife: true
      },
      sourceMap: false,
      toplevel: true,
      warnings: false
    }
  },
  
  resolver: {
    blacklistRE: /(.*\/__tests__\/.*|.*\/\\..*)/,
  }
};
```

### **Web Bundle Optimization**
```javascript
// webpack.config.js optimization
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log in production
            drop_debugger: true
          }
        }
      })
    ],
    
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

### **Image and Asset Optimization**
```javascript
// Asset optimization pipeline
const assetOptimization = {
  images: {
    webp: true, // Convert to WebP for better compression
    compression: 0.8, // 80% quality
    sizes: [1, 2, 3], // Generate @1x, @2x, @3x versions
    formats: ['webp', 'png', 'jpg']
  },
  
  videos: {
    codec: 'h264',
    compression: 'medium',
    formats: ['mp4', 'webm']
  }
};
```

## Monitoring & Analytics

### **Build Monitoring**
```javascript
// Build performance tracking
const buildMetrics = {
  buildTime: Date.now() - buildStart,
  bundleSize: getBundleSize(),
  platform: process.env.PLATFORM,
  nodeVersion: process.version,
  timestamp: new Date().toISOString()
};

// Send to analytics
analytics.track('build_completed', buildMetrics);
```

### **Runtime Monitoring**
```javascript
// Production error monitoring
import crashlytics from '@react-native-firebase/crashlytics';

// Log non-fatal errors
crashlytics().log('User action performed');

// Report crashes
crashlytics().recordError(new Error('Something went wrong!'));

// Set user context
crashlytics().setUserId(userId);
crashlytics().setAttributes({
  role: 'broker',
  region: 'mumbai'
});
```

### **Performance Analytics**
```javascript
// Performance tracking
import { performance } from '@react-native-firebase/perf';

const trace = performance().newTrace('user_login_flow');
await trace.start();

// ... login process ...

await trace.stop();

// Custom metrics
trace.putMetric('api_response_time', apiResponseTime);
trace.putMetric('login_attempts', loginAttempts);
```

## Deployment Checklist

### **Pre-Deployment Checklist**
```markdown
- [ ] All tests passing (unit, integration, e2e)
- [ ] Code review completed and approved
- [ ] Security scan completed (no critical vulnerabilities)
- [ ] Performance benchmarks met
- [ ] Accessibility standards verified (WCAG 2.1 AA)
- [ ] Cross-platform testing completed
- [ ] Database migrations tested
- [ ] API backward compatibility verified
- [ ] Error monitoring configured
- [ ] Rollback plan documented
```

### **Android Release Checklist**
```markdown
- [ ] Release APK/Bundle generated successfully
- [ ] App signed with production certificate
- [ ] ProGuard/R8 optimization applied
- [ ] Play Store metadata updated
- [ ] Screenshots and app store listing prepared
- [ ] Internal testing completed
- [ ] Beta testing completed (if applicable)
- [ ] Play Store review guidelines compliance verified
```

### **iOS Release Checklist**
```markdown
- [ ] Archive created successfully in Xcode
- [ ] App signed with distribution certificate
- [ ] App Store Connect metadata updated
- [ ] Screenshots and app store listing prepared
- [ ] TestFlight internal testing completed
- [ ] TestFlight external testing completed (if applicable)
- [ ] App Store review guidelines compliance verified
- [ ] Privacy policy and terms updated
```

### **Web Release Checklist**
```markdown
- [ ] Production build optimized and minified
- [ ] Web performance audit completed (Lighthouse)
- [ ] Cross-browser compatibility verified
- [ ] CDN configuration updated
- [ ] SSL certificate valid
- [ ] SEO metadata configured
- [ ] Progressive Web App features tested
- [ ] Analytics tracking verified
```

## Troubleshooting Guide

### **Common Android Issues**
```bash
# Build errors
# Clean and rebuild
cd android
./gradlew clean
cd ..
rm -rf node_modules
yarn install
yarn android

# Missing SDK/NDK
# Install via Android Studio SDK Manager
# Update android/build.gradle with correct versions

# Signing errors  
# Verify keystore path and credentials
# Check android/app/build.gradle signing config
```

### **Common iOS Issues**
```bash
# Pod installation issues
cd ios
pod deintegrate
pod clean
pod install
cd ..

# Xcode build errors
# Clean build folder: Cmd+Shift+K
# Reset simulator: Device → Erase All Content and Settings
# Update Xcode to latest version

# Code signing errors
# Verify Apple Developer account status
# Update provisioning profiles
# Clean derived data: ~/Library/Developer/Xcode/DerivedData
```

### **Common Web Issues**
```bash
# Webpack compilation errors
# Clear webpack cache
rm -rf dist/ node_modules/.cache
yarn install
yarn web:build

# Missing web stubs
# Ensure all React Native modules have web stubs in web-stubs/
# Update webpack.config.js alias configuration

# CORS errors
# Configure devServer.allowedHosts in webpack.config.js
# Ensure API server has correct CORS headers
```

### **Performance Issues**
```bash
# Large bundle size
# Analyze bundle with webpack-bundle-analyzer
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/bundle.js

# Memory leaks
# Use Flipper or React DevTools Profiler
# Check for listeners not being removed
# Verify Redux state cleanup

# Slow startup
# Use React Native performance profiler
# Check for heavy operations on main thread
# Optimize image loading and caching
```

## Version Management

### **Semantic Versioning**
```json
{
  "version": "MAJOR.MINOR.PATCH",
  "examples": {
    "1.0.0": "Initial release",
    "1.0.1": "Bug fixes",
    "1.1.0": "New features (backward compatible)",
    "2.0.0": "Breaking changes"
  }
}
```

### **Version Update Process**
```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.1 -> 1.1.0 
npm version major  # 1.1.0 -> 2.0.0

# Update native versions
# Android: android/app/build.gradle (versionCode, versionName)
# iOS: ios/justo/Info.plist (CFBundleShortVersionString, CFBundleVersion)
```

### **Release Notes Template**
```markdown
## Version X.Y.Z (YYYY-MM-DD)

### 🎉 New Features
- Feature description with user benefit

### 🔧 Improvements  
- Performance optimizations
- UI/UX enhancements

### 🐛 Bug Fixes
- Fix description with affected functionality

### 🔒 Security
- Security improvements and vulnerability fixes

### 📱 Platform Specific
- Android: Platform-specific changes
- iOS: Platform-specific changes
- Web: Platform-specific changes

### ⚠️ Breaking Changes
- Changes requiring user action

### 📝 Technical Changes
- Dependency updates
- Infrastructure changes
```

## Production Deployment

### **Replit Deployment Configuration**
```javascript
// Configure deployment for Replit
module.exports = {
  deployment_target: "autoscale", // For web deployment
  run: ["npm", "run", "web"],
  build: ["npm", "run", "web:build"],
  
  environment: {
    NODE_ENV: "production",
    PORT: "5000"
  }
};
```

### **Production Environment Variables**
```bash
# Required for production deployment
NODE_ENV=production
GLOBAL_URL=https://api.justoworks.co.in
FIREBASE_PROJECT_ID=justo-prod
FIREBASE_DATABASE_URL=https://justo-prod-default-rtdb.firebaseio.com

# Security
STORE_PASSWORD=<production_store_password>
KEY_ALIAS=<production_key_alias>
KEY_PASSWORD=<production_key_password>
```

### **Health Checks**
```javascript
// Application health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: process.env.APP_VERSION,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    platform: 'web'
  });
});

// Readiness check
app.get('/ready', (req, res) => {
  // Check database connectivity, external APIs, etc.
  res.json({
    status: 'ready',
    services: {
      database: 'connected',
      firebase: 'connected',
      api: 'available'
    }
  });
});
```

## Conclusion

This deployment documentation provides comprehensive guidelines for building and deploying the Justo Real Estate Field Worker application across all supported platforms. The multi-platform approach ensures consistent user experience while maintaining platform-specific optimizations.

Key deployment benefits:
- **Multi-Platform Support**: Android, iOS, and Web deployment strategies
- **Automated CI/CD**: Comprehensive pipeline for quality assurance
- **Environment Management**: Separate configurations for development, staging, and production
- **Security Best Practices**: Code signing, secure environment variables, and vulnerability management
- **Performance Optimization**: Bundle size reduction and runtime performance monitoring
- **Monitoring & Analytics**: Comprehensive error tracking and performance analytics

The deployment process is designed to ensure zero-downtime updates, comprehensive testing, and quick rollback capabilities for production environments.

---

**Document Version**: 1.0  
**Deployment Guide Date**: September 2025  
**Platform Compatibility**: Android API 24+, iOS 12+, Modern Web Browsers  
**Next Update**: Post-framework updates and security enhancements