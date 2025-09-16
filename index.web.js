import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Initialize performance monitoring for web
import './app/utils/performanceMonitor';

// Initialize testing system in development
import './app/utils/testingSystem';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Get the main component
const { getApplication } = AppRegistry;
const RootComponent = getApplication(appName).element;

// Create root and render
const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(React.createElement(RootComponent));