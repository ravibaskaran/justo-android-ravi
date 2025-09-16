# API Integration Documentation

## Executive Summary

This document provides comprehensive documentation for the Justo Real Estate Field Worker application's backend API integration. It covers all endpoints, authentication patterns, data transformation flows, error handling strategies, and integration with external services including Firebase and JustoWorks API.

## API Architecture Overview

### **Multi-Service Integration Strategy**
```
┌─────────────────────────────────────────────────────────────────┐
│                    Justo Mobile Application                     │
├─────────────────────────────────────────────────────────────────┤
│  HTTP Client Layer (axios)                                     │
│  ├── Primary API (GLOBAL_URL/api/)                             │
│  ├── JustoWorks Demo API (demoapi.justoworks.co.in/)           │
│  └── JustoWorks Production API (commented)                     │
├─────────────────────────────────────────────────────────────────┤
│  Firebase Services                                              │
│  ├── Authentication (Firebase Auth)                            │
│  ├── Real-time Database (justo-37d73)                         │
│  ├── Cloud Storage                                             │
│  └── Cloud Messaging                                           │
└─────────────────────────────────────────────────────────────────┘
```

### **Authentication Flow**
```javascript
// Multi-layer authentication strategy
const authenticationFlow = {
  primary: "JWT Token from /api/token/jwtToken",
  secondary: "User login token from /auth/userLogin",
  firebase: "Firebase UID from authentication",
  storage: "AsyncStorage for token persistence"
};
```

## HTTP Client Configuration

### **Base Configuration**
```javascript
// Primary API Client
const httpClient = axios.create({
  baseURL: `${GLOBAL_URL}/api/`,
  timeout: 30000, // Recommended: Add timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// JustoWorks Integration Clients
const httpClientJW = axios.create({
  baseURL: 'http://demoapi.justoworks.co.in/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Production JustoWorks Client (Currently Disabled)
// baseURL: 'https://justoworks.co.in/'
```

### **Enhanced HTTP Client with Security**
```javascript
// Recommended enhanced configuration
const enhancedHttpClient = axios.create({
  baseURL: `${GLOBAL_URL}/api/`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Justo-Mobile-App/1.0.0'
  }
});

// Request Interceptor (Recommended Enhancement)
enhancedHttpClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('AuthToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request ID for tracking
    config.headers['X-Request-ID'] = generateRequestId();
    
    // Log API calls in development
    if (__DEV__) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Recommended Enhancement)
enhancedHttpClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (__DEV__) {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      await handleTokenExpiration();
      return Promise.reject(error);
    }
    
    // Handle rate limiting
    if (error.response?.status === 429) {
      await handleRateLimit(error);
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);
```

## API Endpoints Catalog

### **Authentication & User Management**
```javascript
const authEndpoints = {
  // Core Authentication
  JWTTOKEN: "token/jwtToken",                    // GET - Generate JWT token
  LOGIN: "auth/userLogin",                      // POST - User login
  LOGOUT: "userlogout/userLogout",              // POST - User logout
  
  // Password Management
  FORGOTPASSWORD: "/auth/forgotPassword",       // POST - Initiate password reset
  OTPVERIFY: "/auth/otpVerify",                 // POST - Verify OTP
  RESENDOTP: "/auth/resentOtp",                 // POST - Resend OTP
  UPDATEPASSWORD: "/auth/updatePassword",       // POST - Update password
  CHANGEPASSWORD: "/auth/changePassword",       // POST - Change password
  
  // User Registration & Profile
  REGISTERANDADDUSER: "/auth/userRegister",     // POST - Register new user
  GET_USERPROFILE: "/auth/getUserProfile",      // GET - Get user profile
  EDITUSER: "/auth/editUserProfile",            // PUT - Update user profile
  FIREBASE_UPDATE: "/auth/firebaseIdUpdate",    // POST - Update Firebase ID
  
  // User Management
  GETUSERLIST: "userManage/getUserList",        // POST - Get user list
  GETUSERDETAIL: "/userManage/getUserDetail",   // POST - Get user details
  USERSTATUSUPDATE: "/userManage/userStatusUpdate", // POST - Update user status
  UPDATE_USER_STATUS: "/auth/userOnlineStatusUpdate", // POST - Online status
  CHECKEMAILMOBILE: "/auth/checkEmailMobile"    // POST - Validate email/mobile
};
```

### **Dashboard & Analytics**
```javascript
const dashboardEndpoints = {
  // Role-specific Dashboards
  DASHBOARD_SOURCING: "/dashboard/dashboardDetailSourcing",      // POST
  DASHBOARD_CLOSING: "/dashboard/dashboardDetailClosing",        // POST
  DASHBOARD_POSTSALES: "/dashboard/dashboardDetailPostSale",     // POST
  DASHBOARD_RECEPTIONIST: "/dashboard/dashboardDetailReception", // POST
  DASHBOARD_SITE_HEAD: "/dashboard/dashboardDetailSiteHead",     // POST
  DASHBOARD_SCM: "/dashboard/dashboardSCM",                      // POST
  
  // Analytics & Reporting
  GET_LEADERBOARD: "/leaderboard/getActivePropertyListForLeaderboard", // POST
  GET_LEADERBOARD_DETAIL: "/leaderboard/getPropertyLeaderboardDetails" // POST
};
```

### **Property Management**
```javascript
const propertyEndpoints = {
  // Property CRUD Operations
  ADDPROPERTY: "/property/addProperty",                    // POST - Create property
  PROPERTYLIST: "/property/getAllProperty",               // POST - Get all properties
  EDITPROPERTY: "/property/editProperty",                 // PUT - Update property
  GETPROPERTYDETAIL: "/property/getPropertyDetails",      // POST - Get property details
  PROPERTYSTATUSUPDATE: "/property/propertyStatusUpdate", // POST - Update status
  
  // Property Filtering & Search
  PROPERTYFILTER: "/property/filterProperty",             // POST - Filter properties
  GETPROPERTYFILTERDETAIL: "/property/filterProperty",    // POST - Filtered details
  
  // Property Allocation & Management
  PROPERTYALLOCATELIST: "/property/getPropertyAlocateUserList",     // POST
  ALLOCATEPROPERTYTOUSER: "/property/propertyAllocateToUsers",      // POST
  PROPERTYSUBSCRIBE: "/property/userSubscribeUnsubscribeProperty",  // POST
  ALLOCATEREQUEST: "property/getCpListForPropertyAllocateRequest",  // POST
  ALLOCATCPSOH: "property/getCpSrcHeadPropertyAllocateRequest",     // POST
  
  // Property Configuration
  GET_PROPERTY_COMPETITOR: "/property/getPropertyCompetitorList",   // POST
  GET_PROPERTYCONFIGURATION: "/property/getPropertyConfigurationsList", // POST
  GET_PROPERTY_BASE_SM: "/property/getPropertyBasedSM",             // POST
  GET_PROPERTY_BASE_CM: "/property/getPropertyBasedCM",             // POST
  GET_CP_PROPERTY_FOR_SM: "/property/getCpPropertySM"               // POST
};
```

### **Lead & Visitor Management**
```javascript
const leadEndpoints = {
  // Lead Management
  VISITORLIST: "/visit/getVisiterList",              // POST - Get visitor list
  GET_VISITOR_DETAIL_: "/visit/getVisitDetails",     // POST - Get visitor details
  ADD_VISITOR_: "/visit/addVisit",                   // POST - Add new visitor
  EDIT_VISITOR_: "/visit/editVisit",                 // PUT - Update visitor
  VISITOR_STATUS_UPDATE: "/visit/updateVisitStatus", // POST - Update status
  
  // Visit Validation & Management
  CHECK_VISIT_AVAILABLE: "/visit/customerCheckForMobile",      // POST
  CHECK_VISIT_MOB_AVAILABLE: "/visit/nextVisitCheckMob",       // POST
  CHECK_REFERENCE_NMBR_EXIST: "/visit/checkReferenceNmbrExist", // POST
  GET_USERVISTLIST: "/visit/getUserVisitList",                // POST
  CLOSE_VISIT: "/visit/closeVisit",                           // POST
  CREATE_VISIT_WITHOUT_PROPERTY: "/visit/addVisitProperty"     // POST
};
```

### **Channel Partner & Agent Management**
```javascript
const agentEndpoints = {
  // Channel Partner Operations
  CREATECHANNELPARTNER: "/channelPartner/createCPwithcompany",  // POST
  EDIT_CHANNELPARTNER: "/channelPartner/updateChannelPartner",  // PUT
  AGENTLIST: "/channelPartner/getchannelPartnerList",          // POST
  PENDING_AGENTLIST: "/channelPartner/getchannelPartnerList",  // POST
  GET_AGENT_DETAIL_: "/channelPartner/getChannelPartnersDetails", // POST
  
  // Agent Management
  ADD_AGENT_: "/channelPartner/createAgent",                   // POST
  EDIT_AGENT_: "/channelPartner/editAgent",                    // PUT
  AGENT_STATUS_UPDATE: "/channelPartner/ApproveChannelpartnerbysourcinghead", // POST
  GET_EMPLOYEE_LIST: "/channelPartner/getcompanyEmployee",     // POST
  
  // Agent Operations
  TRANSFER_VISIT: "/channelPartner/transferVisitAgent",        // POST
  GET_CP_ACTIVE_LEAD: "/channelPartner/getCpActiveLead",       // POST
  ADD_TARGET_FOR_CP: "/channelPartner/addTargetForChannelPartner", // POST
  UPDATE_CP_PROPERTY_SM: "/channelPartner/updateCppropertySM", // POST
  VERIFY_CP: "channelPartner/verifyCp",                        // POST
  CP_UNDERPROPERTY: "/channelPartner/cpUnderProperty"          // POST
};
```

### **Appointment Management**
```javascript
const appointmentEndpoints = {
  // Appointment CRUD
  GET_APPOINTMENT_LIST: "/appointment/getAppointmentList",     // POST
  GET_APPOINTMENT_DETAILS: "/appointment/getAppointmentDetails", // POST
  ADD_APPOINTMENT: "/appointment/addAppointment",              // POST
  EDIT_APPOINTMENT: "/appointment/editAppointment",            // PUT
  CLOSE_APPOINTMENT: "/appointment/closeAppointment",          // POST
  
  // Appointment Operations
  ALLOCATE_CM: "/appointment/appointmentAlocateClosinManager", // POST
  ADD_DROPLOCATION: "/appointment/addDropOffLocation",         // POST
  CHECKIN_APPOINTMENT: "/appointment/checkInAppointmentProperty", // POST
  CHECK_ALREADY_CHECKIN: "/appointment/checkAlreadyCheckIn",   // POST
  
  // Pickup & Location Management
  PICKUP_LIST: "appointment/getPickupAddressList",             // POST
  UPDATE_PICKUP_LIST: "/appointment/updatePickupStatus",       // POST
  GET_CHECKING_APPOINTMENT_LIST: "/appointment/getCheckInAppointmentList", // POST
  
  // User Appointments
  CREATE_USER_APPOINTMENT: "/userAppointment/createUserAppointment",  // POST
  GET_USER_APPOINTMENT_LIST: "/userAppointment/getUSerAppoinmentList", // POST
  EDIT_USER_APPOINTMENT: "/userAppointment/editUserAppointment",       // PUT
  UPDATE_USER_APPOINTMENT_STATUS: "/userAppointment/userAppointmentStatusUpdate", // POST
  
  // Recovery Management
  GET_RECOVERY_LIST: "/appointment/getRecoveryAppointmentList" // POST
};
```

### **Booking & Registration Management**
```javascript
const bookingEndpoints = {
  // Booking Operations
  ADD_BOOKING: "/booking/addBooking",                 // POST - FormData for file uploads
  GET_BOOKINGLIST: "/booking/getBookingList",         // POST
  GET_BOOKINGDETAIL: "/booking/getBookingdetails",    // POST
  UPDATE_BOOKINGSTATUS: "/booking/updateBooking",     // PUT
  CANCEL_BOOKING: "/booking/bookingStatusUpdate",     // POST
  
  // Registration Management
  REGISTER_BOOKING: "/registration/addRegistration",           // POST
  GET_REGISTERLIST: "/registration/getRegistrationList",      // POST
  GET_BOOKINGREGISTERDETAIL: "/registration/getRegistrationDetails" // POST
};
```

### **Communication & Chat**
```javascript
const chatEndpoints = {
  // Chat Management
  GET_ALL_USER_CHAT_LIST: "/chat/getAllUserListForChat",      // POST
  GET_RECENT_CHAT_LIST: "/chat/getUserListForChating",        // POST
  UPDATE_CHAT_STATUS: "/chat/userChatStatusUpdate",           // POST
  GET_PROPERTY_LIST_FOR_CHAT: "/chat/getCpActivePropertyList" // POST
};
```

### **Master Data & Configuration**
```javascript
const masterEndpoints = {
  // Master Data
  GET_CITY_LIST: "/master/getCityList",           // POST
  GET_ROLE_LIST: "/role/getRoles",                // POST
  ADDMASTERLIST: "/master/getMasterList",         // POST
  CREATEMASTER: "/master/createMaster",           // POST
  
  // Property Configuration
  GETPROPERTYTYPE: "/master/getPropertyType",     // POST
  GETCONFIGURATION: "/master/getConfiguration",   // POST
  GETAMENITY: "/master/getAmenity"                // POST
};
```

### **Team Management**
```javascript
const teamEndpoints = {
  // Sourcing Manager Management
  GET_SOURCING_MANAGER_LIST: "/userManage/getUserSourcingManagerList",   // POST
  GET_SOURCING_HEAD_SM_LIST: "/userManage/getSourcingHeadSMlist",         // POST
  GET_SOURCING_MANAGER_DETAIL: "/userManage/getUserSourcingManagerDetail", // POST
  GET_SOURCINGMANAGER: "/channelPartner/getListSourcingManager",          // POST
  
  // Closing Manager Management
  GET_CLOSINGMANAGER: "/userManage/getClosingManagerListOnCH",            // POST
  GETCMDETAIL: "/userManage/getUserClosingManagerDetail",                 // POST
  GET_CLOSHEADGMANAGER: "/userManage/getClosingManagerCloseH",            // POST
  
  // Assignment Management
  GET_ASSIGNCP_LIST: "/userManage/getAssignCPList",                       // POST
  STATUS_UPDATE_ASSIGN_CP: "/userManage/smUpdateAssignCpStatus",          // POST
  ASSIGNCP_SM: "/userManage/cpAssignSorcingManager",                      // POST
  ADD_CP_BUCKET: "/userManage/addCpToBucket",                             // POST
  GET_USERS_LIST_FOR_SH: "/userManage/getUserListForSitehead"             // POST
};
```

### **Support & Ticketing**
```javascript
const supportEndpoints = {
  // Support Forum
  GET_SUPPORT_FORUM_LIST: "/supportForum/supportForumList",         // POST
  GET_SUPPORT_FORUM_DETAIL: "/supportForum/getSupportForumDetails", // POST
  UPDATE_SUPPORTFORUM: "/supportForum/statusUpdateSupportForum",    // POST
  
  // Ticket Management
  ADD_TICKET: "/support/addSupport",                    // POST
  EDIT_TICKET: "/support/updateSupport",               // PUT
  TICKET_LIST: "/support/getSupportList",              // POST
  TICKET_DETAILS: "/support/getTicketDetail",          // POST
  TICKET_STATUS_UPDATE: "/support/replySupportTicket", // POST
  GET_SUPPORT_USER_LIST: "/support/getSupportUserList", // POST
  ESCALATE_REQ_TICKET: "/support/escalateRequestTicket" // POST
};
```

### **Follow-up & Activity Management**
```javascript
const followUpEndpoints = {
  // Follow-up Management
  GET_FOLLOWUP_LIST: "/followupStatus/getFollowupList",       // POST
  GET_FOLLOWUP_DETAILS: "/followupStatus/getFollowupDetails", // POST
  UPDATE_FOLLOWUP: "/followupStatus/updatefollowup",          // PUT
  ADD_FOLLOWUP: "/followupStatus/addfollowup",                // POST
  
  // Scheduled Activities
  SCHEDULED_ACTIVITY: "/followupStatus/getScheduleFollowUpList", // POST
  CLOSE_ACTIVITY: "/followupStatus/markScheduledFollowup"        // POST
};
```

### **Reporting & Analytics**
```javascript
const reportEndpoints = {
  // Role-based Reports
  GET_CM_REPORT: "/authreport/getCMreport",           // POST - Closing Manager
  GET_CT_REPORT: "/authreport/getCTreport",           // POST - Closing Team
  GET_SM_REPORT: "/authreport/getSMreport",           // POST - Sourcing Manager
  GET_ST_REPORT: "/authreport/getSTreport",           // POST - Sourcing Team
  GET_SH_CH_REPORT: "/authreport/getSHCHreport",      // POST - Sourcing Head/Closing Head
  GET_BM_REPORT: "/authreport/getBMreport",           // POST - Business Manager
  GET_SCM_REPORT: "/authreport/getSCMreport",         // POST - Supply Chain Manager
  GET_CL_H_REPORT: "/authreport/getClHreport",        // POST - Closing Head
  GET_SRC_H_REPORT: "/authreport/getSrcHreport",      // POST - Sourcing Head
  GET_PROJECT_DETAILS_REPORT: "/authreport/getPdrReport" // POST - Project Details
};
```

### **Settings & Notifications**
```javascript
const settingsEndpoints = {
  // Settings Management
  UPDATECHANNELPARTNER: "/channelPartner/updateChannelPartner", // PUT
  
  // Notification Management
  NOTIFICATION_LIST: "/notification/getNotificationList",       // POST
  DELETE_NOTIFICATION: "/notification/statusUpdateNotification", // POST
  
  // Permissions
  PERMISSION_MODULE: "/userManage/getUsermodels"                // GET
};
```

### **External Service Integration**
```javascript
const externalEndpoints = {
  // JustoWorks Integration
  GET_INVENTORY_JW: "inventory/fetch_record_details",    // GET - JW API
  CP_REGISTOR_JW: "cp/fetch_channel_partner_id",        // POST - JW API
  
  // Firebase Integration
  FIREBASE_DATABASE_URL: "https://justo-37d73-default-rtdb.firebaseio.com/"
};
```

## Data Flow Patterns

### **Standard API Call Pattern**
```javascript
// Redux Action Pattern for API Calls
export const standardApiAction = (params) => async (dispatch) => {
  // 1. Start Loading State
  dispatch({ type: START_LOADING });
  
  try {
    // 2. Make API Call
    const response = await apiCall("post", apiEndPoints.ENDPOINT, params);
    
    // 3. Handle Success Response
    if (response?.data?.status === 200) {
      dispatch({
        type: ACTION_SUCCESS,
        payload: response.data
      });
    } else {
      // 4. Handle API Error Response
      handleApiError(response?.data);
      dispatch({
        type: ACTION_ERROR,
        payload: response.data
      });
    }
  } catch (error) {
    // 5. Handle Network/System Error
    dispatch({
      type: ACTION_ERROR,
      payload: error.message
    });
  } finally {
    // 6. Stop Loading State
    dispatch({ type: STOP_LOADING });
  }
};
```

### **Authentication Flow**
```javascript
// JWT Token Generation Flow
const tokenGenerationFlow = async () => {
  try {
    const options = {
      headers: { "content-type": "application/json" }
    };
    
    const response = await axios.get(
      `${GLOBAL_URL}/api/token/jwtToken`, 
      options
    );
    
    if (response.data?.status === 200) {
      await AsyncStorage.setItem("token", response.data.token);
      await setDefaultHeader("token", response.data.token);
    }
  } catch (error) {
    console.error("Token generation failed:", error);
  }
};

// User Login Flow
export const userLogin = (loginDetail) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  
  try {
    const response = await apiCall("post", apiEndPoints.LOGIN, loginDetail);
    
    if (response.data.status === 200) {
      // Store authentication data
      await AsyncStorage.setItem("AuthToken", response?.data?.token);
      await AsyncStorage.setItem("userData", JSON.stringify(response?.data?.data));
      
      // Initialize Firebase authentication
      try {
        const firebaseUser = await auth().createUserWithEmailAndPassword(
          loginDetail.email, 
          loginDetail.password
        );
        
        await AsyncStorage.setItem(
          "firebase_id", 
          JSON.stringify(firebaseUser.user.uid)
        );
      } catch (firebaseError) {
        console.log("Firebase authentication error:", firebaseError);
      }
      
      dispatch({
        type: USER_LOGIN,
        payload: response.data
      });
    } else {
      handleApiError(response?.data);
      dispatch({
        type: LOGIN_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.message,
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
```

### **File Upload Pattern**
```javascript
// FormData Construction for File Uploads
const createFormDataForUpload = (data, files) => {
  const formData = new FormData();
  
  // Add text fields
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  
  // Add file uploads
  if (files && files.length > 0) {
    files.forEach((file, index) => {
      formData.append(`file_${index}`, {
        uri: file.uri,
        type: file.type,
        name: file.name
      });
    });
  }
  
  return formData;
};

// File Upload API Call
export const uploadWithFiles = (data, files) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  
  try {
    const formData = createFormDataForUpload(data, files);
    const header = { 
      "Content-Type": "multipart/form-data",
      "access-control-allow-origin": "*"
    };
    
    const response = await apiCall("post", apiEndPoints.UPLOAD_ENDPOINT, formData, header);
    
    if (response.data.status === 200) {
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: response.data
      });
    } else {
      handleApiError(response.data);
      dispatch({
        type: UPLOAD_ERROR,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch({
      type: UPLOAD_ERROR,
      payload: error.message
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
```

### **Data Transformation Patterns**
```javascript
// Permission Processing Pattern
const checkPermission = async (modules, isAdmin) => {
  if (isAdmin) {
    return modules; // Admin has all permissions
  }
  
  const userPermissions = [];
  
  for (const module of modules) {
    const hasPermission = await validateUserPermission(module);
    if (hasPermission) {
      userPermissions.push({
        ...module,
        accessible: true,
        lastChecked: new Date().toISOString()
      });
    }
  }
  
  return userPermissions;
};

// Chat Data Transformation for react-native-gifted-chat
const transformChatData = (rawChatData) => {
  return rawChatData.map(message => ({
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.timestamp),
    user: {
      _id: message.senderId,
      name: message.senderName,
      avatar: message.senderAvatar || defaultAvatar
    },
    // Additional metadata
    messageType: message.type,
    status: message.status,
    attachments: message.attachments || []
  }));
};

// Report Data Processing
const processReportData = (rawData, reportType, dateRange) => {
  const processedData = {
    reportType,
    generatedAt: new Date().toISOString(),
    dateRange,
    summary: calculateSummary(rawData),
    details: rawData.map(item => ({
      ...item,
      formattedDate: formatDateForDisplay(item.date),
      calculatedMetrics: calculateMetrics(item)
    })),
    charts: generateChartData(rawData),
    totals: calculateTotals(rawData)
  };
  
  return processedData;
};
```

## Error Handling Strategy

### **Centralized Error Handling**
```javascript
// Error Classification
const errorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR', 
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

// Enhanced Error Handler
const handleApiError = (errorData) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    errorData,
    userFriendlyMessage: ''
  };
  
  // Determine error type and user message
  switch (errorData?.status) {
    case 400:
      errorInfo.type = errorTypes.VALIDATION_ERROR;
      errorInfo.userFriendlyMessage = errorData?.message || 'Please check your input and try again.';
      break;
      
    case 401:
      errorInfo.type = errorTypes.AUTHENTICATION_ERROR;
      errorInfo.userFriendlyMessage = 'Your session has expired. Please log in again.';
      // Trigger logout
      handleSessionExpiration();
      break;
      
    case 403:
      errorInfo.type = errorTypes.PERMISSION_ERROR;
      errorInfo.userFriendlyMessage = 'You do not have permission to perform this action.';
      break;
      
    case 422:
      errorInfo.type = errorTypes.VALIDATION_ERROR;
      errorInfo.userFriendlyMessage = formatValidationErrors(errorData?.errors);
      break;
      
    case 500:
      errorInfo.type = errorTypes.SERVER_ERROR;
      errorInfo.userFriendlyMessage = 'Server error. Please try again later.';
      break;
      
    default:
      errorInfo.type = errorTypes.UNKNOWN_ERROR;
      errorInfo.userFriendlyMessage = 'Something went wrong. Please try again.';
  }
  
  // Log error for debugging
  console.error('API Error:', errorInfo);
  
  // Show user-friendly message
  ErrorMessage({
    msg: errorInfo.userFriendlyMessage,
    backgroundColor: RED_COLOR
  });
  
  // Report to crash analytics
  crashlytics().log(JSON.stringify(errorInfo));
  
  return errorInfo;
};

// Network Error Handling
const handleNetworkError = (error) => {
  if (!error.response) {
    // Network connectivity issue
    ErrorMessage({
      msg: 'Please check your internet connection and try again.',
      backgroundColor: RED_COLOR
    });
    
    return {
      type: errorTypes.NETWORK_ERROR,
      message: 'Network connectivity issue'
    };
  }
  
  return handleApiError(error.response.data);
};

// Session Expiration Handling
const handleSessionExpiration = async () => {
  // Clear stored authentication data
  await AsyncStorage.multiRemove([
    'AuthToken', 
    'userData', 
    'firebase_id', 
    'loginData'
  ]);
  
  // Reset Redux state
  store.dispatch({ type: USER_LOGOUT });
  
  // Navigate to login screen
  navigationRef.current?.navigate('LoginScreen');
};
```

### **Retry Mechanism**
```javascript
// Exponential Backoff Retry
const apiCallWithRetry = async (method, url, data, options = {}) => {
  const maxRetries = options.maxRetries || 3;
  const baseDelay = options.baseDelay || 1000;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiCall(method, url, data);
      return response;
    } catch (error) {
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      
      // Don't retry on final attempt
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      console.log(`Retrying API call (attempt ${attempt + 1}/${maxRetries}): ${url}`);
    }
  }
};
```

## Firebase Integration

### **Firebase Services Configuration**
```javascript
// Firebase Service Integration
const firebaseServices = {
  auth: {
    signIn: async (email, password) => {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return userCredential;
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          // Create user if not exists
          return await auth().createUserWithEmailAndPassword(email, password);
        }
        throw error;
      }
    },
    
    signOut: async () => {
      await auth().signOut();
      await AsyncStorage.removeItem('firebase_id');
    }
  },
  
  database: {
    baseUrl: "https://justo-37d73-default-rtdb.firebaseio.com/",
    
    setupListeners: (userId) => {
      const userRef = database().ref(`users/${userId}`);
      const chatRef = database().ref(`chats/${userId}`);
      const notificationRef = database().ref(`notifications/${userId}`);
      
      // User data listener
      userRef.on('value', (snapshot) => {
        store.dispatch(updateUserData(snapshot.val()));
      });
      
      // Chat listener
      chatRef.on('child_added', (snapshot) => {
        store.dispatch(addNewMessage(snapshot.val()));
      });
      
      // Notification listener
      notificationRef.on('child_added', (snapshot) => {
        store.dispatch(addNotification(snapshot.val()));
      });
    },
    
    cleanup: (userId) => {
      database().ref(`users/${userId}`).off();
      database().ref(`chats/${userId}`).off();
      database().ref(`notifications/${userId}`).off();
    }
  },
  
  messaging: {
    requestPermission: async () => {
      const authStatus = await messaging().requestPermission();
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    },
    
    getToken: async () => {
      const token = await messaging().getToken();
      return token;
    },
    
    setupListeners: () => {
      // Foreground message handler
      messaging().onMessage(async remoteMessage => {
        console.log('Foreground message:', remoteMessage);
        store.dispatch(addNotification(remoteMessage));
      });
      
      // Background message handler
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Background message:', remoteMessage);
      });
    }
  }
};
```

## Request/Response Data Models

### **Authentication Request/Response Models**
```javascript
// Login Request
interface LoginRequest {
  email: string;
  password: string;
  device_id?: string;
  fcm_token?: string;
}

// Login Response
interface LoginResponse {
  status: number;
  message: string;
  token: string;
  data: {
    _id: string;
    email: string;
    name: string;
    role_id: string;
    role_name: string;
    permissions: string[];
    profile_image?: string;
    phone?: string;
    company_id?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}

// User Profile Update Request
interface UserProfileUpdateRequest {
  name?: string;
  phone?: string;
  profile_image?: File;
  address?: string;
  city_id?: string;
  state_id?: string;
}
```

### **Property Management Models**
```javascript
// Property Creation Request
interface PropertyCreateRequest {
  property_name: string;
  property_type_id: string;
  builder_name: string;
  location: string;
  city_id: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  configurations: PropertyConfiguration[];
  images: File[];
  documents: File[];
  price_range: {
    min_price: number;
    max_price: number;
  };
  possession_date?: string;
  rera_number?: string;
  description?: string;
}

// Property Configuration
interface PropertyConfiguration {
  configuration_type: string; // "1BHK", "2BHK", etc.
  carpet_area: number;
  saleable_area: number;
  price: number;
  quantity: number;
}

// Property List Response
interface PropertyListResponse {
  status: number;
  message: string;
  data: Property[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_records: number;
    per_page: number;
  };
}
```

### **Lead Management Models**
```javascript
// Lead Creation Request
interface LeadCreateRequest {
  customer_name: string;
  customer_mobile: string;
  customer_email?: string;
  property_id: string;
  configuration_interested?: string[];
  budget_range: {
    min_budget: number;
    max_budget: number;
  };
  lead_source: string;
  remarks?: string;
  alternate_mobile?: string;
  address?: string;
  lead_priority?: "Hot" | "Warm" | "Cold";
  appointment_date?: string;
}

// Lead Update Request
interface LeadUpdateRequest {
  lead_id: string;
  status?: "New" | "Contacted" | "Qualified" | "Appointment" | "Site Visit" | "Booking" | "Closed";
  remarks?: string;
  follow_up_date?: string;
  assigned_to?: string;
}

// Lead Response
interface LeadResponse {
  _id: string;
  customer_name: string;
  customer_mobile: string;
  customer_email?: string;
  property_details: {
    _id: string;
    property_name: string;
    location: string;
  };
  lead_source: string;
  status: string;
  priority: string;
  created_by: {
    _id: string;
    name: string;
    role: string;
  };
  assigned_to?: {
    _id: string;
    name: string;
    role: string;
  };
  created_at: string;
  updated_at: string;
  follow_ups: FollowUp[];
  appointments: Appointment[];
}
```

### **Booking Models**
```javascript
// Booking Creation Request
interface BookingCreateRequest {
  lead_id: string;
  customer_id: string;
  property_id: string;
  flat_type: string;
  floor: string;
  flat_name: string;
  saleable_area: number;
  carpet_area: number;
  booking_amount: number;
  agreement_value: number;
  rate_achieved: number;
  payment_type: "Cash" | "Cheque" | "UPI" | "NEFT";
  cheque_image?: File;
  description?: string;
  booking_status: number;
  appointment_id: string;
}

// Booking Response
interface BookingResponse {
  _id: string;
  booking_number: string;
  lead_details: LeadResponse;
  property_details: Property;
  flat_details: {
    flat_type: string;
    floor: string;
    flat_name: string;
    saleable_area: number;
    carpet_area: number;
  };
  financial_details: {
    booking_amount: number;
    agreement_value: number;
    rate_achieved: number;
    payment_type: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
  documents: Document[];
}
```

## Security & Performance Considerations

### **API Security Headers**
```javascript
// Security Headers Configuration
const securityHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

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
```

### **Rate Limiting & Throttling**
```javascript
// Client-side rate limiting
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }
  
  checkRateLimit(endpoint, maxRequests = 100, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(endpoint)) {
      this.requests.set(endpoint, []);
    }
    
    const requestTimes = this.requests.get(endpoint);
    
    // Remove old requests outside window
    const validRequests = requestTimes.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      throw new Error(`Rate limit exceeded for ${endpoint}`);
    }
    
    validRequests.push(now);
    this.requests.set(endpoint, validRequests);
    
    return true;
  }
}

const rateLimiter = new RateLimiter();

// Apply rate limiting to API calls
const rateLimitedApiCall = async (method, url, data) => {
  rateLimiter.checkRateLimit(url);
  return await apiCall(method, url, data);
};
```

### **Response Caching Strategy**
```javascript
// Response caching implementation
class ApiCache {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = new Map();
  }
  
  set(key, data, ttlMs = 300000) { // 5 minutes default
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + ttlMs);
  }
  
  get(key) {
    const expiry = this.cacheExpiry.get(key);
    if (expiry && Date.now() > expiry) {
      this.cache.delete(key);
      this.cacheExpiry.delete(key);
      return null;
    }
    return this.cache.get(key);
  }
  
  clear() {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

const apiCache = new ApiCache();

// Cached API call implementation
const cachedApiCall = async (method, url, data, options = {}) => {
  // Only cache GET requests
  if (method.toLowerCase() === 'get') {
    const cacheKey = `${url}_${JSON.stringify(data)}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached) {
      console.log('Returning cached response for:', url);
      return cached;
    }
    
    const response = await apiCall(method, url, data);
    
    if (response?.data?.status === 200) {
      apiCache.set(cacheKey, response, options.cacheTtl);
    }
    
    return response;
  }
  
  // Non-cacheable request
  return await apiCall(method, url, data);
};
```

## Testing & Debugging

### **API Testing Framework**
```javascript
// API endpoint testing utilities
class ApiTester {
  constructor() {
    this.testResults = [];
  }
  
  async testEndpoint(endpoint, method, payload, expectedStatus = 200) {
    const testStart = Date.now();
    
    try {
      const response = await apiCall(method, endpoint, payload);
      const responseTime = Date.now() - testStart;
      
      const testResult = {
        endpoint,
        method,
        payload,
        expectedStatus,
        actualStatus: response.status,
        responseTime,
        success: response.status === expectedStatus,
        timestamp: new Date().toISOString()
      };
      
      this.testResults.push(testResult);
      
      if (testResult.success) {
        console.log(`✅ ${endpoint} - ${responseTime}ms`);
      } else {
        console.error(`❌ ${endpoint} - Expected: ${expectedStatus}, Got: ${response.status}`);
      }
      
      return testResult;
    } catch (error) {
      const testResult = {
        endpoint,
        method,
        payload,
        expectedStatus,
        error: error.message,
        success: false,
        timestamp: new Date().toISOString()
      };
      
      this.testResults.push(testResult);
      console.error(`❌ ${endpoint} - Error: ${error.message}`);
      
      return testResult;
    }
  }
  
  generateReport() {
    const totalTests = this.testResults.length;
    const successfulTests = this.testResults.filter(r => r.success).length;
    const failedTests = totalTests - successfulTests;
    
    return {
      totalTests,
      successfulTests,
      failedTests,
      successRate: (successfulTests / totalTests) * 100,
      results: this.testResults
    };
  }
}

// Performance monitoring
const performanceMonitor = {
  logApiCall: (endpoint, method, duration, status) => {
    const logEntry = {
      endpoint,
      method,
      duration,
      status,
      timestamp: new Date().toISOString()
    };
    
    // Log to analytics service
    analytics().logEvent('api_call', logEntry);
    
    // Log slow requests
    if (duration > 5000) {
      console.warn(`Slow API call: ${endpoint} took ${duration}ms`);
    }
  }
};
```

### **Debug Utilities**
```javascript
// API debugging utilities
const debugUtils = {
  logRequest: (method, url, data) => {
    if (__DEV__) {
      console.group(`🔵 API Request: ${method.toUpperCase()} ${url}`);
      console.log('Payload:', JSON.stringify(data, null, 2));
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    }
  },
  
  logResponse: (url, response, duration) => {
    if (__DEV__) {
      console.group(`🟢 API Response: ${url} (${duration}ms)`);
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(response.data, null, 2));
      console.groupEnd();
    }
  },
  
  logError: (url, error) => {
    if (__DEV__) {
      console.group(`🔴 API Error: ${url}`);
      console.error('Error:', error);
      console.groupEnd();
    }
  }
};
```

## Migration & Upgrade Recommendations

### **API Versioning Strategy**
```javascript
// API version management
const apiVersions = {
  v1: `${GLOBAL_URL}/api/v1/`,
  v2: `${GLOBAL_URL}/api/v2/`,
  current: `${GLOBAL_URL}/api/` // Maps to latest version
};

// Versioned API client
const createVersionedClient = (version = 'current') => {
  return axios.create({
    baseURL: apiVersions[version],
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'API-Version': version
    }
  });
};
```

### **Gradual Migration Strategy**
```javascript
// Feature flag controlled API migration
const useNewApiEndpoint = (feature) => {
  const featureFlags = getFeatureFlags();
  return featureFlags[`new_api_${feature}`] || false;
};

// Dual API call for migration
const migratedApiCall = async (method, oldEndpoint, newEndpoint, data) => {
  if (useNewApiEndpoint(oldEndpoint)) {
    try {
      return await apiCall(method, newEndpoint, data);
    } catch (error) {
      // Fallback to old endpoint
      console.warn(`New endpoint failed, falling back to old: ${newEndpoint}`);
      return await apiCall(method, oldEndpoint, data);
    }
  }
  
  return await apiCall(method, oldEndpoint, data);
};
```

## Conclusion

The Justo API integration architecture provides a comprehensive foundation for reliable backend communication with robust error handling, security measures, and performance optimization. The multi-service approach with Firebase integration ensures real-time capabilities while maintaining data consistency and user experience.

Key strengths of the current API integration:
- **Comprehensive Endpoint Coverage**: 100+ endpoints covering all business functions
- **Consistent Patterns**: Standardized Redux action patterns for API interactions
- **Multi-Service Support**: Primary API + JustoWorks + Firebase integration
- **Error Resilience**: Robust error handling and retry mechanisms
- **Authentication Security**: Multi-layer authentication with token management
- **File Upload Support**: FormData handling for document and image uploads
- **Real-time Updates**: Firebase integration for live data synchronization

Areas for enhancement during modernization:
- **Security Hardening**: Enhanced request signing and validation
- **Performance Optimization**: Response caching and request batching
- **Error Recovery**: Improved retry logic and fallback strategies
- **Monitoring**: Enhanced logging and performance tracking
- **Testing**: Comprehensive API testing framework implementation

This API integration documentation serves as the foundation for maintaining and enhancing the backend communication layer during the modernization process.

---

**Document Version**: 1.0  
**API Documentation Date**: September 2025  
**Last Endpoint Audit**: Current implementation review  
**Next Review**: Post-framework updates in Phase 3