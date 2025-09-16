# Justo Application Architecture

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Principles](#architecture-principles)
- [Technology Stack](#technology-stack)
- [Application Structure](#application-structure)
- [State Management](#state-management)
- [Navigation Architecture](#navigation-architecture)
- [Firebase Integration](#firebase-integration)
- [API Integration](#api-integration)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Security Architecture](#security-architecture)
- [Performance Considerations](#performance-considerations)
- [Scalability Design](#scalability-design)
- [Error Handling](#error-handling)

## System Overview

Justo is a comprehensive field worker tracking application built using React Native, designed to manage real estate sales operations across web, Android, and iOS platforms. The application supports multiple user roles with distinct workflows for brokers, sales teams, and management personnel.

### Development Architecture Evolution
Based on Phase 1 implementation learnings, the application now follows a **Web-First Development Strategy**:
- **Primary Development**: Web environment with comprehensive React Native compatibility
- **Secondary Deployment**: Mobile platforms via external CI/CD pipelines
- **Testing Strategy**: Web-first validation before mobile build deployment

### Core Architecture Pattern
The application follows a **Layered Architecture** with **Web-First Development** and clear separation of concerns:

```
┌─────────────────────────────────────┐
│           Presentation Layer        │  React Native Components & Views
├─────────────────────────────────────┤
│         Web Compatibility Layer     │  React Native Web Stubs (15+ modules)
├─────────────────────────────────────┤
│           State Management          │  Redux Store & Actions
├─────────────────────────────────────┤
│           Business Logic            │  Services & Utilities
├─────────────────────────────────────┤
│           Data Access Layer         │  API Client & Firebase SDK
├─────────────────────────────────────┤
│           External Services         │  Firebase, Backend API
└─────────────────────────────────────┘
```

## Architecture Principles

### 1. **Modular Design**
- Feature-based module organization
- Clear separation between UI components and business logic
- Reusable component library with consistent design patterns

### 2. **Unidirectional Data Flow**
- Redux manages application state with predictable state updates
- Actions trigger state changes through reducers
- Components subscribe to state changes via selectors

### 3. **Offline-First Architecture**
- Redux Persist ensures data persistence during offline periods
- AsyncStorage provides local data caching
- Firebase offline capabilities for real-time synchronization

### 4. **Role-Based Access Control**
- Centralized user role management
- Permission-based feature access
- Secure route protection based on user roles

### 5. **Cross-Platform Compatibility**
- Shared codebase with platform-specific optimizations
- Native module integration for platform-specific features
- Responsive design for various screen sizes and orientations

## Technology Stack

### **Core Framework**
- **React Native 0.76.0**: Cross-platform mobile framework
- **TypeScript 5.0.4**: Type-safe JavaScript development
- **Metro Bundler**: JavaScript bundling and development server

### **State Management**
- **Redux 5.0.1**: Predictable state container
- **Redux Persist 6.0.0**: State persistence across app sessions
- **Redux Thunk 3.1.0**: Asynchronous action creators
- **AsyncStorage 2.2.0**: Local storage for mobile devices

### **Navigation**
- **React Navigation 7.x**: Declarative navigation framework
- **Drawer Navigator**: Side menu navigation
- **Stack Navigator**: Screen stack management
- **Native Stack**: Performance-optimized stack navigation

### **UI Framework**
- **React Native Elements**: UI component library (@rneui/themed 4.0.0)
- **React Native Paper**: Material Design components
- **React Native Vector Icons**: Icon library
- **React Native Reanimated**: High-performance animations

### **Backend Integration**
- **Firebase Suite**: Authentication, Database, Storage, Messaging
- **Axios 1.10.0**: HTTP client for API communication
- **Custom API Client**: Centralized HTTP request management

### **Native Features**
- **Camera Integration**: Document and image capture
- **Location Services**: GPS and geocoding
- **File Management**: Document handling and sharing
- **Push Notifications**: Real-time messaging
- **Offline Storage**: Local data persistence

## Application Structure

```
justo/
├── app/
│   ├── Redux/                          # State Management
│   │   ├── Store.tsx                   # Redux store configuration
│   │   ├── Actions/                    # Action creators
│   │   │   ├── AuthActions.tsx         # Authentication actions
│   │   │   ├── AgencyActions.tsx       # Broker management actions
│   │   │   ├── LeadsActions.tsx        # Lead management actions
│   │   │   ├── BookingActions.tsx      # Sales conversion actions
│   │   │   ├── ChatActions.tsx         # Communication actions
│   │   │   └── ...                     # Domain-specific actions
│   │   ├── Reducers/                   # State reducers
│   │   │   ├── index.tsx               # Root reducer combiner
│   │   │   ├── AuthReducer.tsx         # Authentication state
│   │   │   ├── AgencyReducer.tsx       # Broker management state
│   │   │   ├── LeadsReducer.tsx        # Lead management state
│   │   │   └── ...                     # Domain-specific reducers
│   │   └── types.tsx                   # Action type constants
│   ├── components/                     # Reusable UI Components
│   │   ├── Button/                     # Custom button component
│   │   ├── Header/                     # Navigation header
│   │   ├── InputField/                 # Form input component
│   │   ├── DropdownInput/              # Dropdown selector
│   │   ├── SearchBar/                  # Search functionality
│   │   ├── Loader/                     # Loading indicator
│   │   ├── ErrorMessage/               # Error handling component
│   │   ├── Modals/                     # Modal components
│   │   │   ├── FilterModal/            # Filter interface
│   │   │   ├── ConfirmationModal/      # Confirmation dialogs
│   │   │   └── ...                     # Various modal types
│   │   ├── CommonScreen/               # Shared screen components
│   │   ├── scaleFontSize/              # Responsive font scaling
│   │   └── utilities/                  # Helper utilities
│   │       ├── constant.tsx            # Application constants
│   │       ├── apiEndPoints.tsx        # API endpoint definitions
│   │       ├── httpClient.tsx          # HTTP client configuration
│   │       ├── Localization.tsx        # Multi-language support
│   │       └── GlobalFunctions.tsx     # Utility functions
│   ├── navigation/                     # Navigation Configuration
│   │   ├── index.tsx                   # Root navigation component
│   │   ├── route.tsx                   # Route definitions
│   │   ├── customDrawer.tsx            # Drawer navigation
│   │   └── styles.tsx                  # Navigation styling
│   ├── views/                          # Screen Components (Features)
│   │   ├── Authentication/             # Login and authentication
│   │   │   ├── LoginScreen/            # User login interface
│   │   │   ├── SplashScreen/           # App startup screen
│   │   │   └── ...                     # Auth-related screens
│   │   ├── AgencyManagement/           # Broker Management
│   │   │   ├── AgencyListing/          # List all brokers
│   │   │   ├── AddAgency/              # Add new broker
│   │   │   ├── AgencyDetailView/       # Broker details
│   │   │   └── ...                     # Agency-related screens
│   │   ├── LeadManagement/             # Prospect Management
│   │   │   ├── LeadManagementScreen/   # Main lead interface
│   │   │   ├── LeadDetails/            # Individual lead details
│   │   │   ├── AddNewVisitor/          # Add new prospect
│   │   │   └── ...                     # Lead-related screens
│   │   ├── BookingManagement/          # Sales Conversion
│   │   │   ├── Booking/                # Booking process
│   │   │   ├── BookingList/            # List all bookings
│   │   │   ├── BookingDetails/         # Booking information
│   │   │   └── ...                     # Booking-related screens
│   │   ├── SourcingManagers/           # Team Management
│   │   │   ├── SourcingManagersView/   # Manager dashboard
│   │   │   ├── AddNewSM/               # Add sourcing manager
│   │   │   ├── SMDetails/              # Manager details
│   │   │   └── ...                     # Management screens
│   │   ├── DashboardScreen/            # Main dashboard
│   │   ├── PropertyManagement/         # Property handling
│   │   ├── AppointmentManagement/      # Meeting scheduling
│   │   ├── ChatSystem/                 # Internal communication
│   │   └── ...                         # Additional feature modules
│   ├── assets/                         # Static Resources
│   │   ├── images/                     # Application images
│   │   ├── icons/                      # Icon assets
│   │   └── fonts/                      # Typography assets
│   └── observables/                    # RxJS reactive patterns
├── android/                            # Android Native Code
├── ios/                                # iOS Native Code
├── web-stubs/                          # Web compatibility stubs
└── patches/                            # Package patches
```

## State Management

### Redux Store Architecture

The application uses a centralized Redux store with domain-specific reducers:

```typescript
// Store Configuration
const rootReducer = {
  // Authentication & User Management
  userData: userData,
  login: authStore,
  userDetail: userDetailReducer,
  loadingReducer: loadingReducer,
  
  // Agency & Broker Management
  agentData: agencyReducer,
  agencyStatus: agencyStatusReducer,
  agencyForm: agencyCreateFormReducer,
  addEditAgency: addEditAgencyReducer,
  
  // Lead & Visitor Management
  visitorDataList: visitorReducer,
  visitorData: visitorListReducer,
  addVisitor: addVisitorReducer,
  editVisitor: editVisitorReducer,
  
  // Booking & Sales Management
  booking: BookingReducer,
  addedBooking: addBookingReducer,
  
  // Property Management
  propertyData: propertyReducer,
  propertyDetail: propertyDetailReducer,
  propertyForm: propertyFormReducer,
  
  // Communication & Chat
  ChatData: ChatReducer,
  chatStatus: updateChatStatus,
  recentChatList: getRecentChatList,
  
  // Management & Administration
  SourcingManager: SourcingManagerReducer,
  ClosingManager: ClosingManagerReducer,
  UserManager: UserManagerReducer,
  
  // Notifications & System
  notificationList: notificationListReducer,
  notificationCount: notificationCountReducer,
  firebase: firebaseReducer,
  
  // Reports & Analytics
  dashboard: dashboardReducer,
  reportData: ReportReducer,
  projectReport: ProjectReportReducer,
  leaderBoard: leaderBoardReducer
};
```

### State Persistence Strategy

```typescript
// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'], // Exclude loading states
  debug: true // Enable debug mode for development
};

// Logout state cleanup
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    // Clear persisted storage
    persistConfig.storage.removeItem('persist:root');
    return reducers(undefined, action);
  }
  return reducers(state, action);
};
```

### Action Pattern

All actions follow a consistent pattern for API interactions:

```typescript
export const exampleAction = (params) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.ENDPOINT, params);
    if (res.data.status === 200) {
      dispatch({
        type: SUCCESS_ACTION,
        payload: res.data
      });
    } else {
      handleApiError(res.data);
      dispatch({
        type: ERROR_ACTION,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_ACTION,
      payload: error
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
```

## Navigation Architecture

### Navigation Hierarchy

```
App
├── AuthLoadingScreen              # Initial authentication check
├── AuthStack                      # Authentication flow
│   ├── LoginScreen               # User login
│   └── SplashScreen              # App initialization
└── AppStack                      # Main application flow
    └── DrawerNavigator           # Side menu navigation
        ├── DashboardScreen       # Main dashboard
        ├── PropertyStack         # Property management flow
        ├── AgencyStack           # Broker management flow
        ├── LeadStack             # Lead management flow
        ├── BookingStack          # Booking management flow
        ├── AppointmentStack      # Appointment scheduling
        ├── ChatStack             # Communication system
        ├── ReportStack           # Analytics and reporting
        ├── SettingsStack         # Application settings
        └── ProfileStack          # User profile management
```

### Navigation Guards

```typescript
// Role-based navigation protection
const ProtectedRoute = ({ component: Component, roles, ...props }) => {
  const { userData } = useSelector(state => state.userData);
  const userRole = userData?.data?.role_id;
  
  if (!roles.includes(userRole)) {
    return <UnauthorizedScreen />;
  }
  
  return <Component {...props} />;
};
```

### Deep Linking Strategy

```typescript
// URL structure for deep linking
const linking = {
  prefixes: ['justo://'],
  config: {
    screens: {
      Dashboard: 'dashboard',
      PropertyDetails: 'property/:propertyId',
      LeadDetails: 'lead/:leadId',
      BookingDetails: 'booking/:bookingId',
      Chat: 'chat/:roomId'
    }
  }
};
```

## Firebase Integration

### Service Architecture

```
Firebase Services
├── Authentication (auth)
│   ├── Email/Password Authentication
│   ├── User Account Creation
│   ├── Password Reset Flow
│   └── Session Management
├── Realtime Database (database)
│   ├── User Profiles
│   ├── Chat Messages
│   ├── Real-time Notifications
│   └── Activity Tracking
├── Cloud Storage (storage)
│   ├── User Documents
│   ├── Property Images
│   ├── Chat Attachments
│   └── Report Files
└── Cloud Messaging (messaging)
    ├── Push Notifications
    ├── Background Messages
    ├── Topic Subscriptions
    └── Message Analytics
```

### Authentication Flow

```typescript
// Firebase Authentication Integration
const authenticateUser = async (email, password) => {
  try {
    // Check if user exists, if not create account
    let userCredential;
    try {
      userCredential = await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        userCredential = await auth().createUserWithEmailAndPassword(email, password);
      }
    }
    
    // Store Firebase user ID
    await AsyncStorage.setItem('firebase_id', userCredential.user.uid);
    
    // Update Redux state
    dispatch(updateFirebase({ firebase_id: userCredential.user.uid }));
    
    return userCredential;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};
```

### Real-time Data Synchronization

```typescript
// Database listeners for real-time updates
const setupDatabaseListeners = (userId) => {
  const userRef = database().ref(`users/${userId}`);
  const chatRef = database().ref(`chats/${userId}`);
  const notificationRef = database().ref(`notifications/${userId}`);
  
  // Listen for user data changes
  userRef.on('value', (snapshot) => {
    dispatch(updateUserData(snapshot.val()));
  });
  
  // Listen for new chat messages
  chatRef.on('child_added', (snapshot) => {
    dispatch(addNewMessage(snapshot.val()));
  });
  
  // Listen for notifications
  notificationRef.on('child_added', (snapshot) => {
    dispatch(addNotification(snapshot.val()));
  });
};
```

## API Integration

### HTTP Client Configuration

```typescript
// Centralized API client with interceptors
const httpClient = axios.create({
  baseURL: GLOBAL_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for authentication
httpClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('AuthToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      dispatch(userLogout());
    }
    return Promise.reject(error);
  }
);
```

### API Endpoint Management

```typescript
// Centralized endpoint definitions
const apiEndPoints = {
  // Authentication endpoints
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  FORGOTPASSWORD: '/api/forgot-password',
  
  // User management
  GETUSERSLIST: '/api/users',
  CREATEUSER: '/api/users/create',
  UPDATEUSER: '/api/users/update',
  
  // Agency management
  AGENCYLIST: '/api/agencies',
  CREATEAGENCY: '/api/agencies/create',
  UPDATEAGENCY: '/api/agencies/update',
  
  // Lead management
  GETLEADSLIST: '/api/leads',
  CREATELEAD: '/api/leads/create',
  UPDATELEAD: '/api/leads/update',
  
  // Property management
  PROPERTYLIST: '/api/properties',
  PROPERTYDETAIL: '/api/properties/detail',
  
  // Booking management
  BOOKINGLIST: '/api/bookings',
  CREATEBOOKING: '/api/bookings/create',
  
  // Chat system
  GET_ALL_USER_CHAT_LIST: '/api/chat/users',
  GET_RECENT_CHAT_LIST: '/api/chat/recent',
  UPDATE_CHAT_STATUS: '/api/chat/status'
};
```

## Component Architecture

### Component Hierarchy

```
Components (Reusable)
├── Layout Components
│   ├── Header                    # Navigation header with actions
│   ├── DrawerContent            # Side menu content
│   ├── TabBar                   # Bottom navigation
│   └── SafeArea                 # Safe area wrapper
├── Form Components
│   ├── InputField               # Text input with validation
│   ├── DropdownInput            # Selection dropdown
│   ├── DatePicker              # Date selection
│   ├── CountryCodePicker       # Phone country code
│   ├── OTPInput                # One-time password input
│   └── Switch                  # Toggle switch
├── Display Components
│   ├── Button                   # Custom button variations
│   ├── Card                     # Content card container
│   ├── List                     # Data list display
│   ├── Avatar                   # User avatar display
│   ├── Badge                    # Status indicator
│   └── ProgressBar             # Progress indicator
├── Modal Components
│   ├── FilterModal              # Data filtering interface
│   ├── ConfirmationModal        # Action confirmation
│   ├── DateRangeModal          # Date range selection
│   ├── PropertySelectModal      # Property selection
│   └── NotificationModal       # Notification display
├── Media Components
│   ├── FastImage               # Optimized image display
│   ├── CameraComponent         # Camera integration
│   ├── DocumentPicker          # File selection
│   └── VideoPlayer             # Video playback
└── Utility Components
    ├── Loader                   # Loading indicator
    ├── ErrorBoundary           # Error handling
    ├── SearchBar               # Search functionality
    ├── EmptyState              # No data display
    └── RefreshControl          # Pull-to-refresh
```

### Component Design Patterns

#### 1. Container/Presentational Pattern
```typescript
// Container Component (Logic)
const LeadManagementContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { response } = useSelector(state => state.visitorDataList);
  const [filterData, setFilterData] = useState({});
  
  const fetchLeads = useCallback((params) => {
    dispatch(getAllLeadsList(params));
  }, [dispatch]);
  
  return (
    <LeadManagementView
      data={response?.data || []}
      onFilter={setFilterData}
      onRefresh={fetchLeads}
      navigation={navigation}
    />
  );
};

// Presentational Component (UI)
const LeadManagementView = ({ data, onFilter, onRefresh, navigation }) => (
  <View style={styles.container}>
    <Header title="Lead Management" />
    <SearchBar onSearch={onFilter} />
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <LeadCard
          data={item}
          onPress={() => navigation.navigate('LeadDetails', { id: item.id })}
        />
      )}
      onRefresh={onRefresh}
    />
  </View>
);
```

#### 2. Higher-Order Components
```typescript
// Authentication HOC
const withAuth = (Component) => {
  return (props) => {
    const { userData } = useSelector(state => state.userData);
    
    if (!userData?.authToken) {
      return <LoginScreen />;
    }
    
    return <Component {...props} />;
  };
};

// Usage
export default withAuth(DashboardScreen);
```

#### 3. Custom Hooks Pattern
```typescript
// Custom hook for API data fetching
const useApiData = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiCall('post', endpoint, params);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
};
```

## Data Flow

### Unidirectional Data Flow Pattern

```
User Action (UI Event)
         ↓
Action Creator (API Call)
         ↓
Reducer (State Update)
         ↓
Store (State Storage)
         ↓
Component (UI Update)
```

### Data Flow Examples

#### 1. Lead Creation Flow
```typescript
// 1. User submits form
const onSubmitLead = (leadData) => {
  dispatch(createNewLead(leadData));
};

// 2. Action creator makes API call
export const createNewLead = (leadData) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const response = await apiCall('post', apiEndPoints.CREATELEAD, leadData);
    dispatch({
      type: ADD_LEAD_SUCCESS,
      payload: response.data
    });
    // Navigate to lead details
    navigation.navigate('LeadDetails', { id: response.data.id });
  } catch (error) {
    dispatch({
      type: ADD_LEAD_ERROR,
      payload: error.message
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};

// 3. Reducer updates state
const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LEAD_SUCCESS:
      return {
        ...state,
        leads: [...state.leads, action.payload],
        loading: false
      };
    case ADD_LEAD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// 4. Component re-renders with new data
const LeadList = () => {
  const { leads, loading, error } = useSelector(state => state.leadData);
  
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <FlatList
      data={leads}
      renderItem={({ item }) => <LeadCard data={item} />}
    />
  );
};
```

## Security Architecture

### Authentication & Authorization

#### Role-Based Access Control
```typescript
// User roles and permissions
const ROLE_IDS = {
  admin_id: "6703d823a38e367e30eed8e5",
  sourcing_head_id: "66f64d5ebf01ef6a7a59c3de",
  closing_head_id: "66f654a587d9df88e43b17b4",
  sourcingmanager_id: "63466085fadec47fe8e96bb7",
  closingmanager_id: "63731fd3d9363c459e31551f",
  cp_id: "6346a40364de88d6385d4e38",
  agent_id: "6373209fd9363c459e3155b6",
  sitehead_id: "63d37697b29929d68de050f9"
};

// Permission checking utility
const hasPermission = (userRole, requiredPermissions) => {
  const rolePermissions = PERMISSIONS_MAP[userRole] || [];
  return requiredPermissions.every(permission => 
    rolePermissions.includes(permission)
  );
};
```

#### Data Encryption & Storage
```typescript
// Secure token storage
const storeSecureData = async (key, value) => {
  try {
    const encryptedValue = await Keychain.setInternetCredentials(
      key,
      'user',
      JSON.stringify(value)
    );
    return encryptedValue;
  } catch (error) {
    // Fallback to AsyncStorage for less sensitive data
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
};

// Secure token retrieval
const getSecureData = async (key) => {
  try {
    const credentials = await Keychain.getInternetCredentials(key);
    return credentials ? JSON.parse(credentials.password) : null;
  } catch (error) {
    // Fallback to AsyncStorage
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};
```

### Input Validation & Sanitization

```typescript
// Input validation patterns
const Regexs = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /^[6-9]{1}[0-9]{9}$/,
  panRegex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  aadharRegex: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
  gstRegex: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
};

// Input sanitization
const sanitizeInput = (input) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>]/g, '');
};
```

### API Security

```typescript
// Request signing for sensitive operations
const signRequest = (data, secretKey) => {
  const timestamp = Date.now();
  const payload = JSON.stringify({ ...data, timestamp });
  const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();
  
  return {
    ...data,
    timestamp,
    signature
  };
};

// Rate limiting implementation
const rateLimiter = new Map();
const checkRateLimit = (userId, maxRequests = 100, windowMs = 60000) => {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    throw new Error('Rate limit exceeded');
  }
  
  validRequests.push(now);
  rateLimiter.set(userId, validRequests);
};
```

## Performance Considerations

### Memory Management

#### Component Optimization
```typescript
// Memoized components to prevent unnecessary re-renders
const LeadCard = React.memo(({ data, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{data.name}</Text>
    <Text>{data.phone}</Text>
  </TouchableOpacity>
), (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id &&
         prevProps.data.updated_at === nextProps.data.updated_at;
});

// Optimized selectors with reselect
const selectLeadsByStatus = createSelector(
  [state => state.leads.data, (_, status) => status],
  (leads, status) => leads.filter(lead => lead.status === status)
);
```

#### List Optimization
```typescript
// Virtualized lists for large datasets
const LeadList = ({ data }) => {
  const renderItem = useCallback(({ item }) => (
    <LeadCard key={item.id} data={item} />
  ), []);
  
  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
    />
  );
};
```

### Image Optimization

```typescript
// Optimized image loading with caching
const OptimizedImage = ({ source, style }) => (
  <FastImage
    source={{
      uri: source,
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
    style={style}
    resizeMode={FastImage.resizeMode.contain}
  />
);
```

### Bundle Size Optimization

```typescript
// Code splitting with lazy loading
const LazyLeadDetails = React.lazy(() => 
  import('./views/LeadManagement/LeadDetails')
);

const LeadDetailsScreen = (props) => (
  <Suspense fallback={<Loader />}>
    <LazyLeadDetails {...props} />
  </Suspense>
);
```

## Scalability Design

### Horizontal Scaling Considerations

#### Modular Architecture
- Feature modules can be developed independently
- Shared component library ensures consistency
- API services are decoupled from UI components

#### Data Management Scaling
```typescript
// Pagination for large datasets
const usePaginatedData = (endpoint, pageSize = 20) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    
    try {
      const response = await apiCall('post', endpoint, {
        page,
        limit: pageSize
      });
      
      setData(prev => [...prev, ...response.data]);
      setHasMore(response.data.length === pageSize);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    }
  }, [endpoint, page, hasMore, pageSize]);
  
  return { data, loadMore, hasMore };
};
```

#### Caching Strategy
```typescript
// Multi-level caching implementation
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.diskCache = AsyncStorage;
  }
  
  async get(key) {
    // Try memory cache first
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // Try disk cache
    try {
      const diskData = await this.diskCache.getItem(key);
      if (diskData) {
        const parsed = JSON.parse(diskData);
        this.memoryCache.set(key, parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    
    return null;
  }
  
  async set(key, value, ttl = 300000) {
    // Set in memory cache
    this.memoryCache.set(key, value);
    
    // Set in disk cache with TTL
    try {
      const cacheItem = {
        data: value,
        timestamp: Date.now(),
        ttl
      };
      await this.diskCache.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }
}
```

## Error Handling

### Centralized Error Management

```typescript
// Global error handler
class ErrorHandler {
  static handleApiError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          this.handleAuthError();
          break;
        case 403:
          this.handlePermissionError();
          break;
        case 422:
          this.handleValidationError(data);
          break;
        case 500:
          this.handleServerError();
          break;
        default:
          this.handleGenericError(data.message);
      }
    } else if (error.request) {
      // Network error
      this.handleNetworkError();
    } else {
      // Other error
      this.handleGenericError(error.message);
    }
  }
  
  static handleAuthError() {
    store.dispatch(userLogout());
    NavigationService.navigate('LoginScreen');
    this.showErrorMessage('Session expired. Please login again.');
  }
  
  static handleNetworkError() {
    this.showErrorMessage('Network error. Please check your connection.');
  }
  
  static showErrorMessage(message) {
    ErrorMessage({
      msg: message,
      backgroundColor: RED_COLOR
    });
  }
}
```

### Error Boundary Implementation

```typescript
// React Error Boundary for component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to crash reporting service
    crashlytics().recordError(error);
    console.error('Error Boundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong</Text>
          <Button 
            title="Try Again" 
            onPress={() => this.setState({ hasError: false, error: null })}
          />
        </View>
      );
    }
    
    return this.props.children;
  }
}
```

## Conclusion

The Justo application architecture is designed with scalability, maintainability, and performance in mind. The modular structure allows for independent feature development while maintaining consistency across the application. The Redux-based state management provides predictable data flow, and the Firebase integration ensures real-time capabilities with offline support.

Key architectural strengths:
- **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
- **Type Safety**: TypeScript provides compile-time error checking and better development experience
- **Performance**: Optimized rendering, caching strategies, and efficient data handling
- **Security**: Role-based access control, input validation, and secure storage
- **Maintainability**: Modular structure, consistent patterns, and comprehensive error handling
- **Scalability**: Designed to handle growing data volumes and user bases

This architecture provides a solid foundation for the planned modernization phases while ensuring the application remains robust and user-friendly throughout the upgrade process.

---

**Document Version**: 1.0  
**Last Updated**: September 2025  
**Architecture Review Date**: To be determined during Phase 6