# Justo - Real Estate Field Worker Tracking Application

## Project Overview

**Justo** is a comprehensive React Native mobile application designed for tracking and managing field workers in real estate residential and apartment projects. The application serves two primary user types in the real estate sales ecosystem:

1. **Channel Partners/Brokers**: Responsible for activating prospects and getting them to visit apartments
2. **Sales Conversion Teams**: Guide prospects through the sales process and close deals

## Business Context

### Industry Challenge
Real estate projects require coordinated field operations between multiple stakeholders to convert prospects into customers. Traditional methods lack real-time tracking, lead management, and performance analytics.

### Solution Architecture
Justo provides a centralized platform for:
- **Broker Management**: Onboard, activate, and manage channel partners
- **Prospect Tracking**: Monitor visitor engagement and lead scoring
- **Sales Pipeline**: Track appointments, bookings, and conversions
- **Performance Analytics**: Real-time reporting and target tracking
- **Communication Hub**: Internal chat and coordination tools

## Technical Stack

### Frontend
- **Framework**: React Native 0.76.0
- **Language**: TypeScript 5.0.4
- **UI Library**: React Native Elements (@rneui/themed)
- **Navigation**: React Navigation 7.x (Drawer + Stack)
- **State Management**: Redux 5.0.1 + Redux Persist 6.0.0
- **HTTP Client**: Axios 1.10.0
- **Icons**: React Native Vector Icons 10.2.0

### Backend Integration
- **Authentication**: Firebase Auth 22.4.0
- **Database**: Firebase Realtime Database 22.4.0
- **Storage**: Firebase Storage 22.4.0
- **Push Notifications**: Firebase Messaging 22.4.0
- **Local Storage**: AsyncStorage 2.2.0

### Native Features
- **Camera Integration**: React Native Camera Kit
- **Document Handling**: Document Picker, File Viewer
- **Location Services**: Geolocation, Geocoding
- **Media Processing**: Image Picker, Image Crop Picker
- **Communication**: Gifted Chat, Share functionality

## User Roles & Workflows

### Channel Partners (Brokers)
- **Property Allocation**: Receive assigned properties to promote
- **Prospect Generation**: Add new leads to the system
- **Visit Coordination**: Schedule and track property visits
- **Performance Tracking**: Monitor targets and achievements
- **Commission Management**: Track earnings and payments

### Sales Conversion Team
- **Lead Management**: Receive and qualify prospects from brokers
- **Appointment Scheduling**: Coordinate meetings with interested prospects
- **Booking Management**: Process sales agreements and documentation
- **Follow-up System**: Maintain prospect engagement through sales funnel
- **Conversion Reporting**: Track sales metrics and performance

### Management Roles
- **Sourcing Managers**: Oversee broker relationships and performance
- **Closing Managers**: Supervise sales team and conversion metrics
- **Site Heads**: Manage overall project operations and reporting
- **User Managers**: Handle system administration and user management

## Key Features

### Core Functionality
1. **Multi-role Authentication** with Firebase Auth
2. **Real-time Data Synchronization** via Firebase Database
3. **Offline Support** through Redux Persist and AsyncStorage
4. **Push Notifications** for real-time updates
5. **Document Management** with camera integration and file handling
6. **Location-based Services** for property and user tracking
7. **Chat System** for internal communication
8. **Comprehensive Reporting** with dashboard analytics

### Advanced Features
- **Draft Lead Management**: Save incomplete prospect information
- **Appointment Scheduling**: Calendar integration with reminders
- **Target Setting**: Performance goals for field workers
- **Property Allocation**: Dynamic assignment of properties to brokers
- **Booking Workflow**: End-to-end sales process management
- **Support Forum**: Knowledge base and help system
- **Recovery System**: Data backup and restore functionality

## Development Environment

### Prerequisites
- Node.js 18+ (specified in package.json)
- React Native CLI 15.0.0-alpha.2
- Android Studio (for Android development)
- Xcode (for iOS development)
- Firebase project configuration

### Installation
```bash
# Install dependencies
npm install --legacy-peer-deps

# iOS setup
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Web development (for testing)
npm run web
```

### Build Commands
```bash
# Android Release Build
npm run build
cd android && ./gradlew assembleRelease

# Android Bundle (for Play Store)
npm run release
cd android && ./gradlew bundleRelease
```

## Project Structure

```
justo/
├── app/
│   ├── Redux/              # State management
│   │   ├── Store.tsx       # Redux store configuration
│   │   ├── Actions/        # Redux actions
│   │   └── Reducers/       # Redux reducers
│   ├── components/         # Reusable UI components
│   │   ├── Button/         # Custom button component
│   │   ├── Header/         # Navigation header
│   │   ├── utilities/      # Helper functions and constants
│   │   └── Modals/         # Modal components
│   ├── navigation/         # Navigation configuration
│   │   ├── route.tsx       # Main navigation routes
│   │   └── customDrawer.tsx # Drawer navigation
│   ├── views/              # Screen components
│   │   ├── Authentication/ # Login and auth screens
│   │   ├── AgencyManagement/ # Broker management
│   │   ├── LeadManagement/ # Prospect tracking
│   │   ├── BookingManagement/ # Sales processing
│   │   └── SourcingManagers/ # Team management
│   └── assets/             # Images, fonts, and static resources
├── android/                # Android native code
├── ios/                    # iOS native code
└── web-stubs/              # Web compatibility stubs
```

## Current Status

### Implemented Features ✅
- Complete authentication system with Firebase
- Multi-role user management (Brokers, Sales Team, Managers)
- Lead management with prospect tracking
- Agency/broker onboarding and management
- Appointment scheduling and follow-up system
- Booking and sales conversion workflow
- Real-time chat and communication
- Dashboard and reporting functionality
- Document handling and camera integration
- Push notifications and offline support

### Known Issues 🔧
- Vector icon import conflicts (25+ webpack warnings)
- TypeScript compilation errors in Redux store
- ESM module resolution issues with React Navigation
- Deprecated React Native prop-types usage
- Performance optimization opportunities

### Planned Improvements 🚀
- Framework security updates for all dependencies
- UI/UX modernization for high-resolution devices
- Performance optimizations and bundle size reduction
- Comprehensive QA testing documentation
- Enhanced error handling and monitoring
- Accessibility improvements

## Security Considerations

### Current Implementation
- Firebase Authentication for secure user management
- Role-based access control throughout the application
- Secure HTTP client configuration with Axios
- Local storage encryption via Redux Persist
- Permission-based native feature access

### Security Updates Needed
- Update Firebase packages to latest security patches
- Upgrade Axios and HTTP dependencies
- Review and update camera/location permissions
- Implement additional input validation
- Enhanced error logging without exposing sensitive data

## Performance Metrics

### Current Performance
- App startup time: ~2-3 seconds on modern devices
- Navigation transitions: Smooth with React Navigation
- Image loading: Optimized with FastImage component
- Data synchronization: Real-time via Firebase
- Offline functionality: Complete with Redux Persist

### Optimization Targets
- Reduce bundle size through code splitting
- Implement lazy loading for large components
- Optimize image assets for different device densities
- Enhance database query efficiency
- Improve memory management for long-running sessions

## Next Steps

### Phase 1: Documentation & Planning
- Complete architectural documentation
- Framework update planning
- UI/UX modernization strategy
- Comprehensive QA testing protocols

### Phase 2: Security & Framework Updates
- Update all dependencies to latest stable versions
- Resolve compilation warnings and errors
- Implement enhanced security measures
- Performance baseline establishment

### Phase 3: UI/UX Modernization
- Update interface elements for modern devices
- Implement responsive design improvements
- Enhance accessibility features
- Visual regression testing setup

### Phase 4: Quality Assurance
- Comprehensive functional testing
- Performance optimization validation
- Security penetration testing
- User acceptance testing

---

## Contact & Support

This application is developed and maintained for real estate project management. For technical support or feature requests, refer to the development team or project documentation.

**Last Updated**: September 2025
**Version**: 0.0.1
**React Native Version**: 0.76.0