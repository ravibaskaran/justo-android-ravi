# Mobile Build Setup Guide - Android & iOS

## Overview

This guide provides comprehensive instructions for building the Justo React Native app on Android and iOS platforms outside of Replit cloud environment. The cloud development environment is optimized for web development, while mobile builds require dedicated native development environments.

## Prerequisites

### System Requirements

**For Android:**
- Ubuntu 20.04+ or macOS 10.15+
- 8GB+ RAM (16GB recommended)
- 50GB+ free disk space
- Stable internet connection

**For iOS:**
- macOS 12.0+ (required)
- Xcode 14.0+
- 8GB+ RAM (16GB recommended)
- 100GB+ free disk space
- Apple Developer Account

### Development Environment Setup

#### Android Development Environment

1. **Install Java Development Kit**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install openjdk-17-jdk
   
   # macOS (using Homebrew)
   brew install openjdk@17
   
   # Verify installation
   java --version
   ```

2. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK Platform 34
   - Install Android SDK Build-Tools 34.0.0
   - Install Android Emulator (optional for testing)

3. **Set Environment Variables**
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   ```

4. **Install Node.js and Dependencies**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone repository
   git clone <your-repo-url>
   cd justo
   
   # Install dependencies
   npm install --legacy-peer-deps
   ```

#### iOS Development Environment (macOS Only)

1. **Install Xcode**
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **Install CocoaPods**
   ```bash
   sudo gem install cocoapods
   
   # Navigate to iOS directory and install pods
   cd ios
   pod install
   cd ..
   ```

3. **Install Node.js and Dependencies**
   ```bash
   # Install Node.js using Homebrew
   brew install node@18
   
   # Clone repository
   git clone <your-repo-url>
   cd justo
   
   # Install dependencies
   npm install --legacy-peer-deps
   ```

## Build Configuration

### Android Build Configuration

#### Security Setup (REQUIRED)

⚠️ **CRITICAL**: The project previously had hardcoded keystore credentials. These have been removed for security.

1. **Generate Release Keystore**
   ```bash
   cd android/app
   keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure Environment Variables**
   ```bash
   # Set these in your CI/CD environment or local shell
   export MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
   export MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   export MYAPP_UPLOAD_STORE_PASSWORD=your_secure_password
   export MYAPP_UPLOAD_KEY_PASSWORD=your_secure_password
   ```

3. **Update android/app/build.gradle** (if not already configured)
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                   storeFile file(MYAPP_UPLOAD_STORE_FILE)
                   storePassword MYAPP_UPLOAD_STORE_PASSWORD
                   keyAlias MYAPP_UPLOAD_KEY_ALIAS
                   keyPassword MYAPP_UPLOAD_KEY_PASSWORD
               }
           }
       }
       buildTypes {
           release {
               ...
               signingConfig signingConfigs.release
           }
       }
   }
   ```

#### Performance Optimizations

Update `android/gradle.properties`:
```properties
# Memory optimization
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# Gradle build optimizations for cloud environments
org.gradle.daemon=true
org.gradle.configureondemand=true
org.gradle.parallel=true
org.gradle.caching=true

# Network timeout extensions for cloud environments
org.gradle.internal.http.connectionTimeout=300000
org.gradle.internal.http.socketTimeout=300000

# For faster builds during development, limit architectures
# reactNativeArchitectures=arm64-v8a

# For release builds, include all architectures
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

### iOS Build Configuration

#### Code Signing Setup

1. **Manual Certificate Approach**
   - Download distribution certificates from Apple Developer Portal
   - Install in Keychain Access
   - Configure signing in Xcode project settings

2. **Automatic Signing (Recommended for Development)**
   - Open `ios/justo.xcworkspace` in Xcode
   - Select project target
   - Enable "Automatically manage signing"
   - Select your development team

#### Build Schemes
- **Debug**: For development testing
- **Release**: For App Store distribution

## Build Commands

### Android Builds

#### Debug Build (Development)
```bash
# Clean previous builds
cd android
./gradlew clean
cd ..

# Build debug APK
npx react-native run-android

# Or manual build
cd android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

#### Release Build (Production)
```bash
# Build release APK
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk

# Build release AAB (for Google Play)
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS Builds

#### Debug Build (Development)
```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# Build and run on simulator
npx react-native run-ios

# Or build for specific device
npx react-native run-ios --device
```

#### Release Build (Production)
```bash
# Build from Xcode (Recommended)
# 1. Open ios/justo.xcworkspace in Xcode
# 2. Select "Any iOS Device" or specific device
# 3. Product > Archive
# 4. Upload to App Store or export IPA

# Command line archive (Advanced)
cd ios
xcodebuild -workspace justo.xcworkspace -scheme justo -configuration Release -archivePath justo.xcarchive archive
```

## CI/CD Pipeline Setup

### GitHub Actions Configuration

Create `.github/workflows/android.yml`:

```yaml
name: Android Build

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Setup JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Setup Android SDK
      uses: android-actions/setup-android@v3
    
    - name: Cache Gradle packages
      uses: actions/cache@v3
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
        key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
        restore-keys: |
          ${{ runner.os }}-gradle-
    
    - name: Install dependencies
      run: npm install --legacy-peer-deps
    
    - name: Build Android Release
      run: |
        cd android
        ./gradlew assembleRelease
      env:
        MYAPP_UPLOAD_STORE_FILE: ${{ secrets.MYAPP_UPLOAD_STORE_FILE }}
        MYAPP_UPLOAD_KEY_ALIAS: ${{ secrets.MYAPP_UPLOAD_KEY_ALIAS }}
        MYAPP_UPLOAD_STORE_PASSWORD: ${{ secrets.MYAPP_UPLOAD_STORE_PASSWORD }}
        MYAPP_UPLOAD_KEY_PASSWORD: ${{ secrets.MYAPP_UPLOAD_KEY_PASSWORD }}
    
    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-release.apk
        path: android/app/build/outputs/apk/release/app-release.apk
```

Create `.github/workflows/ios.yml`:

```yaml
name: iOS Build

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: macos-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install --legacy-peer-deps
    
    - name: Cache CocoaPods
      uses: actions/cache@v3
      with:
        path: ios/Pods
        key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
        restore-keys: |
          ${{ runner.os }}-pods-
    
    - name: Install CocoaPods
      run: |
        cd ios
        pod install
    
    - name: Build iOS
      run: |
        cd ios
        xcodebuild -workspace justo.xcworkspace -scheme justo -configuration Release -sdk iphonesimulator -derivedDataPath build
```

## Troubleshooting

### Common Android Issues

1. **Gradle Daemon Issues**
   ```bash
   cd android
   ./gradlew --stop
   ./gradlew clean
   ```

2. **Memory Issues**
   - Increase RAM allocation in `gradle.properties`
   - Close unnecessary applications
   - Use `--max-workers=1` flag for limited resources

3. **SDK Version Conflicts**
   - Ensure all Firebase packages use same version
   - Check Android SDK platform compatibility
   - Update build tools if needed

4. **Build Timeout Issues** (Cloud Environments)
   - Use local development environment or dedicated CI
   - Cloud environments like Replit have resource limitations
   - Consider using GitHub Actions or CircleCI for builds

### Common iOS Issues

1. **CocoaPods Issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

2. **Code Signing Issues**
   - Verify Apple Developer account status
   - Check certificate expiration dates
   - Ensure provisioning profiles are valid

3. **Xcode Version Compatibility**
   - Use Xcode 14+ for React Native 0.76
   - Update iOS deployment target if needed

## Security Considerations

### Secrets Management

**Never commit these to version control:**
- Keystore files
- Keystore passwords
- Apple certificates
- API keys
- Firebase configuration files

**Use environment variables or secure secret storage:**
- GitHub Secrets for CI/CD
- Local `.env` files (gitignored)
- Secure key management services

### Code Signing Security

**Android:**
- Use separate upload and signing keys
- Store signing keys securely
- Use Play App Signing

**iOS:**
- Use App Store Connect API keys
- Implement certificate rotation
- Use Xcode Cloud or fastlane for automation

## Performance Monitoring

### Build Time Optimization

**Android:**
- Enable Gradle build cache
- Use parallel builds
- Limit architectures during development
- Use incremental builds

**iOS:**
- Enable build caching in Xcode
- Use incremental builds
- Optimize CocoaPods installation

### Bundle Size Optimization

**Android:**
- Enable ProGuard/R8 shrinking
- Use APK splits for different architectures
- Analyze bundle with `bundletool`

**iOS:**
- Enable bitcode (if supported)
- Use App Thinning
- Analyze with Xcode's bundle analyzer

## Environment Limitations

### Why Cloud Development Environments Can't Build Mobile Apps

**Replit Cloud Environment Limitations:**
- **Memory Constraints**: Android Gradle builds require 4GB+ RAM
- **CPU Limitations**: Shared cloud resources cause build timeouts
- **Missing Native SDKs**: No Android SDK, NDK, or iOS tools
- **Platform Requirements**: iOS requires macOS + Xcode
- **Process Timeouts**: React Native build complexity exceeds execution limits

**Professional Approach:**
- Use cloud environments for web development and iteration
- Set up dedicated CI/CD pipelines for mobile builds
- Local development environments for complex native features
- Cloud services like GitHub Actions for automated builds

## Next Steps

1. **Set up development environment** following this guide
2. **Test debug builds** on local devices/simulators
3. **Configure CI/CD pipelines** for automated builds
4. **Test release builds** and distribution
5. **Monitor build performance** and optimize as needed

## Support Resources

- [React Native Documentation](https://reactnative.dev/docs/environment-setup)
- [Android Developer Guide](https://developer.android.com/docs)
- [iOS Developer Documentation](https://developer.apple.com/documentation/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: September 2025
**Compatible with**: React Native 0.76.0, Android API 34, iOS 15+
**Security Status**: Hardcoded credentials removed, environment variable configuration required