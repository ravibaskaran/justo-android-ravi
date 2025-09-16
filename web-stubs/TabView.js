// React Native Tab View stub for web
import React, { useState } from 'react';

// Mock TabView for web environment
export const TabView = ({ renderScene, navigationState, onIndexChange, renderTabBar, ...props }) => {
  const [index, setIndex] = useState(navigationState.index || 0);
  
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...props.style
    }
  }, [
    // Tab bar
    renderTabBar && React.createElement('div', {
      key: 'tabbar',
      style: {
        display: 'flex',
        borderBottom: '1px solid #ccc'
      }
    }, navigationState.routes.map((route, i) => 
      React.createElement('button', {
        key: route.key,
        onClick: () => handleIndexChange(i),
        style: {
          padding: '10px 20px',
          backgroundColor: i === index ? '#007AFF' : 'transparent',
          color: i === index ? 'white' : '#007AFF',
          border: 'none',
          cursor: 'pointer'
        }
      }, route.title || route.key)
    )),
    
    // Content
    React.createElement('div', {
      key: 'content',
      style: { flex: 1, overflow: 'auto' }
    }, renderScene && renderScene({ route: navigationState.routes[index] }))
  ]);
};

// Scene map for react-native-tab-view
export const SceneMap = (scenes) => {
  return ({ route }) => {
    const Component = scenes[route.key];
    return Component ? React.createElement(Component) : null;
  };
};

// Tab bar for react-native-tab-view  
export const TabBar = ({ navigationState, onIndexChange, ...props }) => {
  return React.createElement('div', {
    style: {
      display: 'flex',
      backgroundColor: '#f8f8f8',
      borderBottom: '1px solid #ccc',
      ...props.style
    }
  }, navigationState.routes.map((route, i) => 
    React.createElement('button', {
      key: route.key,
      onClick: () => onIndexChange && onIndexChange(i),
      style: {
        padding: '10px 15px',
        backgroundColor: 'transparent',
        color: '#007AFF',
        border: 'none',
        cursor: 'pointer',
        borderBottom: i === navigationState.index ? '2px solid #007AFF' : 'none'
      }
    }, route.title || route.key)
  ));
};

// Default export
const ReactNativeTabView = {
  TabView,
  SceneMap,
  TabBar
};

export default ReactNativeTabView;