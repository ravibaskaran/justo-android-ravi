// React Native Image Crop Picker stub for web
import React from 'react';

// Mock the image crop picker functionality for web environment
const ImageCropPicker = {
  // Camera options
  openCamera: async (options = {}) => {
    console.warn('ImageCropPicker.openCamera: Camera functionality not available in web environment');
    return Promise.resolve({
      data: '',
      uri: '/placeholder-camera-image.jpg',
      width: 800,
      height: 600,
      filename: 'camera-capture.jpg',
      size: 0,
      mime: 'image/jpeg'
    });
  },

  // Gallery picker
  openPicker: async (options = {}) => {
    console.warn('ImageCropPicker.openPicker: Gallery picker functionality simulated in web environment');
    
    return new Promise((resolve) => {
      // Create a file input element for web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = options.multiple || false;
      
      input.onchange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
          resolve([]);
          return;
        }

        const results = files.map(file => ({
          data: '',
          uri: URL.createObjectURL(file),
          width: 800,
          height: 600,
          filename: file.name,
          size: file.size,
          mime: file.type
        }));

        resolve(options.multiple ? results : results[0]);
      };

      input.click();
    });
  },

  // Cropper functionality
  openCropper: async (options = {}) => {
    console.warn('ImageCropPicker.openCropper: Image cropping not available in web environment');
    return Promise.resolve({
      data: '',
      uri: options.path || '/placeholder-cropped-image.jpg',
      width: options.width || 300,
      height: options.height || 300,
      filename: 'cropped-image.jpg',
      size: 0,
      mime: 'image/jpeg'
    });
  },

  // Clean up temp files
  cleanSingle: async (path) => {
    console.log('ImageCropPicker.cleanSingle: Cleanup not needed in web environment');
    return Promise.resolve();
  },

  clean: async () => {
    console.log('ImageCropPicker.clean: Cleanup not needed in web environment');
    return Promise.resolve();
  }
};

// Export default and named exports
export default ImageCropPicker;
export { ImageCropPicker };