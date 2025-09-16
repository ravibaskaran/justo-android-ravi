// React Native Gifted Chat stub for web
import React, { useState, useCallback } from 'react';

// Mock Gifted Chat for web environment
export const GiftedChat = ({ 
  messages = [], 
  onSend, 
  user = {}, 
  renderBubble,
  renderInputToolbar,
  renderActions,
  renderSend,
  placeholder = "Type a message...",
  ...props 
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = useCallback(() => {
    if (inputText.trim() && onSend) {
      const newMessage = {
        _id: Math.random().toString(36).substring(7),
        text: inputText,
        createdAt: new Date(),
        user: user
      };
      onSend([newMessage]);
      setInputText('');
    }
  }, [inputText, onSend, user]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#f5f5f5',
      ...props.style
    }
  }, [
    // Messages container
    React.createElement('div', {
      key: 'messages',
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column-reverse'
      }
    }, messages.map(message => 
      React.createElement('div', {
        key: message._id,
        style: {
          margin: '5px 0',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: message.user._id === user._id ? '#007AFF' : 'white',
          color: message.user._id === user._id ? 'white' : 'black',
          alignSelf: message.user._id === user._id ? 'flex-end' : 'flex-start',
          maxWidth: '70%',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }
      }, [
        React.createElement('div', { key: 'text' }, message.text),
        React.createElement('div', {
          key: 'time',
          style: {
            fontSize: '12px',
            opacity: 0.7,
            marginTop: '5px'
          }
        }, new Date(message.createdAt).toLocaleTimeString())
      ])
    )),
    
    // Input container
    React.createElement('div', {
      key: 'input',
      style: {
        display: 'flex',
        padding: '10px',
        backgroundColor: 'white',
        borderTop: '1px solid #ddd'
      }
    }, [
      React.createElement('input', {
        key: 'textInput',
        type: 'text',
        value: inputText,
        onChange: (e) => setInputText(e.target.value),
        onKeyPress: handleKeyPress,
        placeholder: placeholder,
        style: {
          flex: 1,
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '20px',
          outline: 'none'
        }
      }),
      React.createElement('button', {
        key: 'sendButton',
        onClick: handleSend,
        disabled: !inputText.trim(),
        style: {
          marginLeft: '10px',
          padding: '10px 20px',
          backgroundColor: inputText.trim() ? '#007AFF' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: inputText.trim() ? 'pointer' : 'not-allowed'
        }
      }, 'Send')
    ])
  ]);
};

// Additional exports for compatibility
export const Bubble = ({ children, ...props }) => {
  return React.createElement('div', props, children);
};

export const InputToolbar = ({ children, ...props }) => {
  return React.createElement('div', props, children);
};

export const Actions = ({ children, ...props }) => {
  return React.createElement('div', props, children);
};

export const Send = ({ children, ...props }) => {
  return React.createElement('button', props, children);
};

// Default export
export default GiftedChat;