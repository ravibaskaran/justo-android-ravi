# Development Guidelines

## Executive Summary

This document establishes comprehensive development standards, coding practices, and guidelines for the Justo Real Estate Field Worker application modernization project. It ensures consistent code quality, maintainability, and team collaboration throughout the development lifecycle.

## Code Standards & Best Practices

### **TypeScript & JavaScript Standards**
```typescript
// ✅ Preferred: Use TypeScript for all new components
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'broker' | 'sales' | 'manager';
  isActive: boolean;
  createdAt: Date;
  permissions?: string[];
}

// ✅ Preferred: Strong typing with interfaces
const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await apiCall('get', `/users/${userId}`, null);
  return response.data as UserProfile;
};

// ❌ Avoid: Using 'any' type
const getUserProfile = async (userId: any): Promise<any> => {
  // Implementation
};
```

### **React Native Component Standards**
```typescript
// ✅ Preferred: Functional components with TypeScript
import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface UserCardProps {
  user: UserProfile;
  onPress: (userId: string) => void;
  showStatus?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onPress, 
  showStatus = true 
}) => {
  const handlePress = useCallback(() => {
    onPress(user.id);
  }, [user.id, onPress]);

  const statusColor = useMemo(() => {
    return user.isActive ? colors.success : colors.inactive;
  }, [user.isActive]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {showStatus && (
          <View style={[styles.status, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>
              {user.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  email: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
  },
});

export default React.memo(UserCard);
```

### **Redux & State Management Standards**
```typescript
// ✅ Preferred: Type-safe Redux actions and reducers
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = null;
    },
    clearUser: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, clearUser } = userSlice.actions;
export default userSlice.reducer;

// ✅ Preferred: Async thunks for API calls
export const fetchUser = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchUserStart());
  
  try {
    const response = await apiCall('get', `/users/${userId}`, null);
    
    if (response.data.status === 200) {
      dispatch(fetchUserSuccess(response.data.data));
    } else {
      dispatch(fetchUserFailure(response.data.message || 'Failed to fetch user'));
    }
  } catch (error) {
    dispatch(fetchUserFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
};
```

## File Structure & Organization

### **Recommended Project Structure**
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Basic UI elements (Button, Input, etc.)
│   ├── forms/           # Form-specific components
│   ├── navigation/      # Navigation components
│   └── modals/          # Modal components
├── screens/             # Screen components
│   ├── Authentication/ # Auth-related screens
│   ├── Dashboard/       # Dashboard screens
│   ├── Property/        # Property management screens
│   ├── Leads/          # Lead management screens
│   └── Profile/        # User profile screens
├── services/           # API services and external integrations
│   ├── api/           # API client configuration
│   ├── firebase/      # Firebase services
│   └── storage/       # Local storage utilities
├── store/             # Redux store configuration
│   ├── slices/       # Redux slices
│   ├── middleware/   # Custom middleware
│   └── types.ts      # Store type definitions
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── constants/        # App constants and configurations
├── types/            # TypeScript type definitions
└── assets/           # Static assets (images, fonts, etc.)
```

### **File Naming Conventions**
```typescript
// ✅ Preferred naming patterns
UserProfile.tsx          // React components (PascalCase)
userService.ts          // Services and utilities (camelCase)  
USER_TYPES.ts           // Constants (UPPER_SNAKE_CASE)
userSlice.ts           // Redux slices (camelCase)
useUserProfile.ts      // Custom hooks (camelCase starting with 'use')

// ✅ Preferred export patterns
// Named exports for utilities
export const validateEmail = (email: string): boolean => {
  // Implementation
};

// Default exports for main components
export default UserProfile;

// Combined exports when appropriate
export { UserCard, UserList };
export default UserProfile;
```

## API Integration Standards

### **HTTP Client Usage**
```typescript
// ✅ Preferred: Type-safe API calls
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

const apiService = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await apiCall('get', endpoint, null);
    return response.data;
  },

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await apiCall('post', endpoint, data);
    return response.data;
  },

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await apiCall('put', endpoint, data);
    return response.data;
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await apiCall('delete', endpoint, null);
    return response.data;
  },
};

// ✅ Preferred: Centralized API endpoints
export const API_ENDPOINTS = {
  USER: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  PROPERTY: {
    LIST: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
    CREATE: '/properties',
    UPDATE: (id: string) => `/properties/${id}`,
  },
} as const;
```

### **Error Handling Standards**
```typescript
// ✅ Preferred: Comprehensive error handling
class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return new ApiError(
      error.response.status,
      error.response.data?.message || 'API Error',
      error.response.data?.code
    );
  }
  
  if (error.request) {
    return new ApiError(0, 'Network Error', 'NETWORK_ERROR');
  }
  
  return new ApiError(0, error.message || 'Unknown Error', 'UNKNOWN_ERROR');
};

// ✅ Preferred: Error boundaries for React components
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    crashlytics().recordError(error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackComponent />;
    }

    return this.props.children;
  }
}
```

## Performance Guidelines

### **Component Optimization**
```typescript
// ✅ Preferred: Memoization for performance
const ExpensiveComponent = React.memo<ComponentProps>(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      displayName: `${item.firstName} ${item.lastName}`,
      isRecent: isWithinLastWeek(item.createdAt),
    }));
  }, [data]);

  const handleUpdate = useCallback((id: string, updates: Partial<Item>) => {
    onUpdate(id, updates);
  }, [onUpdate]);

  return (
    <FlatList
      data={processedData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard item={item} onUpdate={handleUpdate} />
      )}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
});

// ✅ Preferred: Custom comparison for complex props
const areEqual = (prevProps: ComponentProps, nextProps: ComponentProps) => {
  return (
    prevProps.data.length === nextProps.data.length &&
    prevProps.data.every((item, index) => 
      item.id === nextProps.data[index]?.id &&
      item.updatedAt === nextProps.data[index]?.updatedAt
    )
  );
};

export default React.memo(ExpensiveComponent, areEqual);
```

### **List Performance**
```typescript
// ✅ Preferred: Optimized list rendering
interface OptimizedListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  keyExtractor: (item: T) => string;
  estimatedItemSize?: number;
}

function OptimizedList<T>({ 
  data, 
  renderItem, 
  keyExtractor, 
  estimatedItemSize = 80 
}: OptimizedListProps<T>) {
  const getItemLayout = useCallback(
    (data: ArrayLike<T> | null | undefined, index: number) => ({
      length: estimatedItemSize,
      offset: estimatedItemSize * index,
      index,
    }),
    [estimatedItemSize]
  );

  const renderOptimizedItem = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <MemoizedListItem key={keyExtractor(item)}>
        {renderItem(item, index)}
      </MemoizedListItem>
    ),
    [renderItem, keyExtractor]
  );

  return (
    <FlatList
      data={data}
      renderItem={renderOptimizedItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
      initialNumToRender={10}
    />
  );
}

const MemoizedListItem = React.memo<{ children: React.ReactNode }>(
  ({ children }) => <View>{children}</View>
);
```

## Testing Standards

### **Unit Testing Guidelines**
```typescript
// ✅ Preferred: Comprehensive component testing
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import UserCard from '../UserCard';

const mockUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'broker',
  isActive: true,
  createdAt: new Date(),
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = renderWithProvider(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = renderWithProvider(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('John Doe'));
    expect(mockOnPress).toHaveBeenCalledWith('1');
  });

  it('shows inactive status for inactive users', () => {
    const inactiveUser = { ...mockUser, isActive: false };
    const mockOnPress = jest.fn();
    const { getByText } = renderWithProvider(
      <UserCard user={inactiveUser} onPress={mockOnPress} />
    );

    expect(getByText('Inactive')).toBeTruthy();
  });
});
```

### **API Testing Standards**
```typescript
// ✅ Preferred: API service testing with mocks
import { apiService } from '../services/api';
import { apiCall } from '../utils/httpClient';

jest.mock('../utils/httpClient');
const mockedApiCall = apiCall as jest.MockedFunction<typeof apiCall>;

describe('apiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user successfully', async () => {
    const mockResponse = {
      data: {
        status: 200,
        message: 'Success',
        data: mockUser,
      },
    };
    mockedApiCall.mockResolvedValueOnce(mockResponse);

    const result = await apiService.get<UserProfile>('/users/1');

    expect(mockedApiCall).toHaveBeenCalledWith('get', '/users/1', null);
    expect(result.data).toEqual(mockUser);
  });

  it('should handle API errors gracefully', async () => {
    const mockError = {
      response: {
        status: 404,
        data: { message: 'User not found' },
      },
    };
    mockedApiCall.mockRejectedValueOnce(mockError);

    await expect(apiService.get('/users/999')).rejects.toThrow('User not found');
  });
});
```

## Security Guidelines

### **Authentication & Authorization**
```typescript
// ✅ Preferred: Secure token management
class TokenManager {
  private static readonly TOKEN_KEY = '@justo_auth_token';
  private static readonly REFRESH_TOKEN_KEY = '@justo_refresh_token';

  static async storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem(this.TOKEN_KEY, accessToken),
      AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken),
    ]);
  }

  static async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem(this.TOKEN_KEY);
  }

  static async clearTokens(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(this.TOKEN_KEY),
      AsyncStorage.removeItem(this.REFRESH_TOKEN_KEY),
    ]);
  }

  static async isTokenValid(token: string): Promise<boolean> {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}

// ✅ Preferred: Role-based access control
const usePermissions = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

  const hasRole = useCallback((role: string): boolean => {
    return user?.role === role;
  }, [user]);

  const canAccess = useCallback((resource: string, action: string): boolean => {
    const permission = `${resource}:${action}`;
    return hasPermission(permission);
  }, [hasPermission]);

  return { hasPermission, hasRole, canAccess };
};
```

### **Data Validation**
```typescript
// ✅ Preferred: Input validation with schemas
import * as Yup from 'yup';

const userProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

const validateUserProfile = async (data: any): Promise<UserProfile> => {
  try {
    return await userProfileSchema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new ValidationError(error.errors);
    }
    throw error;
  }
};

// ✅ Preferred: Sanitization for user inputs
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};
```

## Code Quality Standards

### **ESLint Configuration**
```json
{
  "extends": [
    "@react-native/eslint-config",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react-hooks/exhaustive-deps": "error",
    "react-native/no-unused-styles": "error",
    "react-native/split-platform-components": "error",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn"
  }
}
```

### **Code Review Guidelines**
```markdown
## Code Review Checklist

### Functionality ✅
- [ ] Code accomplishes intended functionality
- [ ] Edge cases are handled appropriately
- [ ] Error scenarios are properly managed
- [ ] No business logic in UI components

### Code Quality ✅
- [ ] Code is readable and well-organized
- [ ] Functions are focused and single-purpose
- [ ] Variable names are descriptive
- [ ] No code duplication
- [ ] Appropriate comments for complex logic

### Performance ✅
- [ ] No unnecessary re-renders
- [ ] Proper memoization where needed
- [ ] Efficient data structures used
- [ ] No memory leaks

### Security ✅
- [ ] No sensitive data in logs
- [ ] Input validation implemented
- [ ] Proper authentication/authorization
- [ ] No hardcoded secrets

### Testing ✅
- [ ] Unit tests cover new functionality
- [ ] Integration tests for complex workflows
- [ ] Edge cases are tested
- [ ] Tests are maintainable
```

## Documentation Standards

### **Code Documentation**
```typescript
/**
 * Represents a user profile in the Justo system
 * @interface UserProfile
 * @property {string} id - Unique user identifier
 * @property {string} name - Full name of the user
 * @property {string} email - User's email address
 * @property {'broker' | 'sales' | 'manager'} role - User's role in the system
 * @property {boolean} isActive - Whether the user account is active
 * @property {Date} createdAt - Account creation timestamp
 * @property {string[]} [permissions] - Optional array of user permissions
 */
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'broker' | 'sales' | 'manager';
  isActive: boolean;
  createdAt: Date;
  permissions?: string[];
}

/**
 * Fetches user profile data from the API
 * @async
 * @function getUserProfile
 * @param {string} userId - The unique identifier of the user
 * @returns {Promise<UserProfile>} The user profile data
 * @throws {ApiError} When the user is not found or API request fails
 * @example
 * ```typescript
 * try {
 *   const user = await getUserProfile('user-123');
 *   console.log(user.name);
 * } catch (error) {
 *   console.error('Failed to fetch user:', error.message);
 * }
 * ```
 */
const getUserProfile = async (userId: string): Promise<UserProfile> => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await apiCall('get', `/users/${userId}`, null);
  
  if (response.data.status !== 200) {
    throw new ApiError(response.data.status, response.data.message);
  }

  return response.data.data as UserProfile;
};
```

### **README Standards**
```markdown
# Component/Module Name

Brief description of what this component/module does.

## Usage

```typescript
import { ComponentName } from './ComponentName';

<ComponentName
  prop1="value1"
  prop2={value2}
  onAction={handleAction}
/>
```

## Props/Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prop1 | string | Yes | - | Description of prop1 |
| prop2 | number | No | 0 | Description of prop2 |
| onAction | function | No | - | Callback fired when... |

## Examples

### Basic Usage
```typescript
// Example code here
```

### Advanced Usage
```typescript
// More complex example
```

## Testing

```bash
npm test ComponentName
```

## Notes

- Any important notes
- Known limitations
- Related components/modules
```

## Git Workflow & Conventions

### **Branch Naming**
```bash
# Feature branches
feature/user-profile-update
feature/property-search-filters

# Bug fixes
bugfix/login-token-refresh
hotfix/critical-data-loss

# Releases
release/v1.2.0
release/v1.2.1-hotfix
```

### **Commit Message Standards**
```bash
# Format: type(scope): description
feat(auth): add biometric login support
fix(api): handle network timeout errors
docs(readme): update installation instructions
style(components): fix button alignment issues
refactor(utils): extract common validation functions
test(api): add unit tests for user service
chore(deps): update react-native to 0.72.0

# Breaking changes
feat(api)!: change user endpoint response format

BREAKING CHANGE: User API now returns nested profile object
```

### **Pull Request Template**
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance tested (if applicable)

## Screenshots/Videos
If applicable, add screenshots or videos of the changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## Environment & Tooling

### **Development Environment Setup**
```bash
# Required tools
node --version          # >= 18.0.0
yarn --version          # 3.6.4+
react-native --version  # 0.76.0

# IDE Extensions (VS Code)
# - ES7+ React/Redux/React-Native snippets
# - TypeScript Importer
# - ESLint
# - Prettier
# - React Native Tools
# - GitLens

# Git hooks setup (Husky)
npx husky install
npx husky add .husky/pre-commit "yarn lint && yarn test"
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

### **Code Formatting**
```json
// .prettierrc
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid"
}
```

## Conclusion

These development guidelines establish a foundation for consistent, maintainable, and high-quality code throughout the Justo application modernization project. Following these standards ensures:

- **Code Consistency**: Uniform coding style across the entire team
- **Maintainability**: Code that is easy to understand, modify, and extend
- **Quality Assurance**: Comprehensive testing and review processes
- **Security**: Best practices for handling sensitive data and user authentication
- **Performance**: Optimized components and efficient data handling
- **Collaboration**: Clear communication and documentation standards

Regular review and updates of these guidelines ensure they remain relevant and effective as the project evolves and new technologies are adopted.

---

**Document Version**: 1.0  
**Guidelines Established**: September 2025  
**Next Review**: Quarterly or after major technology updates  
**Maintenance**: Development Team Lead + Senior Developers