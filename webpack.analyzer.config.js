// Webpack Bundle Analyzer Configuration
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: './index.web.js',
  
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      
      // React Native module aliases
      'react-native-vector-icons$': path.resolve(__dirname, 'web-stubs/VectorIcons.js'),
      'react-native-share$': path.resolve(__dirname, 'web-stubs/Share.js'),
      'react-native-device-info$': path.resolve(__dirname, 'web-stubs/DeviceInfo.js'),
      'rn-fetch-blob$': path.resolve(__dirname, 'web-stubs/RNFetchBlob.js'),
      'react-native-snackbar$': path.resolve(__dirname, 'web-stubs/Snackbar.js'),
      'react-native-localization$': path.resolve(__dirname, 'web-stubs/Localization.js'),
      'react-native-fast-image$': path.resolve(__dirname, 'web-stubs/FastImage.js'),
      'react-native-image-crop-picker$': path.resolve(__dirname, 'web-stubs/ImageCropPicker.js'),
      'react-native-tab-view$': path.resolve(__dirname, 'web-stubs/TabView.js'),
      'react-native-gifted-chat$': path.resolve(__dirname, 'web-stubs/GiftedChat.js'),
      
      // Firebase stubs
      '@react-native-firebase/app$': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/auth$': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/database$': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/messaging$': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/storage$': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-async-storage/async-storage$': path.resolve(__dirname, 'web-stubs/AsyncStorage.js'),
      
      // Other native modules
      'expo-constants$': path.resolve(__dirname, 'web-stubs/ExpoConstants.js'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@react-native/babel-preset'],
            plugins: ['react-native-reanimated/plugin'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        firebase: {
          test: /[\\/]node_modules[\\/](@react-native-firebase|firebase)[\\/]/,
          name: 'firebase',
          chunks: 'all',
        },
        navigation: {
          test: /[\\/]node_modules[\\/](@react-navigation|react-navigation)[\\/]/,
          name: 'navigation',
          chunks: 'all',
        },
      },
    },
  },
};