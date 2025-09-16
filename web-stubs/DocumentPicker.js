// Document picker stub for web
const DocumentPicker = {
  types: {
    allFiles: '*',
    images: 'image/*',
    plainText: 'text/plain',
    audio: 'audio/*',
    pdf: 'application/pdf',
  },
  pick: (options) => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = options?.type || '*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          resolve([{
            uri: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type,
          }]);
        } else {
          reject(new Error('User cancelled'));
        }
      };
      input.click();
    });
  },
  pickSingle: (options) => {
    return DocumentPicker.pick(options).then(results => results[0]);
  },
};

export default DocumentPicker;