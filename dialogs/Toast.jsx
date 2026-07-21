import { useState, createContext, useContext, useEffect } from 'react';

const ToastContext = createContext({
  message: '',
});

const timer = {};

export const useToastContext = () => useContext(ToastContext);

export const Toast = () => {
  const { message } = useToastContext();
  return (
    <>
      {message && (
        <span
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            background: '#0080009e',
            zIndex: '1',
            borderRadius: '8px',
            padding: '8px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {message}
        </span>
      )}
    </>
  );
};

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  return (
    <ToastContext.Provider
      value={{
        message,
        setMessage: text => {
          clearTimeout(timer.id);
          timer.id = setTimeout(() => {
            setMessage('');
          }, 3000);
          setMessage(text);
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
