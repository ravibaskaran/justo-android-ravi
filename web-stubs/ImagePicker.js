// Image picker stub for web
const ImagePicker = {
  launchImageLibrary: (options, callback) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        callback({
          assets: [{
            uri: URL.createObjectURL(file),
            fileName: file.name,
            fileSize: file.size,
            type: file.type,
          }]
        });
      }
    };
    input.click();
  },
  launchCamera: (options, callback) => {
    console.log('Camera not available in web version');
    callback({ didCancel: true });
  },
};

export default ImagePicker;