// React Native Share stub for web
const Share = {
  open: (options) => {
    if (navigator.share) {
      return navigator.share({
        title: options.title,
        text: options.message,
        url: options.url,
      });
    } else {
      // Fallback: copy to clipboard or alert
      const shareText = [options.title, options.message, options.url].filter(Boolean).join('\n');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText);
        alert('Content copied to clipboard');
      } else {
        alert('Sharing not supported. Content: ' + shareText);
      }
      return Promise.resolve();
    }
  },
  single: (options) => Share.open(options),
};

export default Share;