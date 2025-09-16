const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

const babelConfig = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['react-native-reanimated/plugin'],
};

module.exports = {
  entry: './index.web.js',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'react-native-vector-icons': path.resolve(__dirname, 'web-stubs/VectorIcons.js'),
      '@react-native-firebase/app': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/auth': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/messaging': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/database': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-firebase/storage': path.resolve(__dirname, 'web-stubs/Firebase.js'),
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'web-stubs/AsyncStorage.js'),
      '@notifee/react-native': path.resolve(__dirname, 'web-stubs/Notifee.js'),
      'react-native-version-check': path.resolve(__dirname, 'web-stubs/VersionCheck.js'),
      'react-native-camera-kit': path.resolve(__dirname, 'web-stubs/Camera.js'),
      'react-native-image-picker': path.resolve(__dirname, 'web-stubs/ImagePicker.js'),
      'react-native-document-picker': path.resolve(__dirname, 'web-stubs/DocumentPicker.js'),
      'react-native-fs': path.resolve(__dirname, 'web-stubs/FileSystem.js'),
      'react-native-share': path.resolve(__dirname, 'web-stubs/Share.js'),
      'react-native-device-info': path.resolve(__dirname, 'web-stubs/DeviceInfo.js'),
      'rn-fetch-blob': path.resolve(__dirname, 'web-stubs/RNFetchBlob.js'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
    mainFields: ['react-native', 'browser', 'module', 'main'],
    fullySpecified: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules(?!(\/|\\\\)(react-native-.*|@react-native.*|react-navigation.*|rn-fetch-blob))/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|otf|woff2?)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
};