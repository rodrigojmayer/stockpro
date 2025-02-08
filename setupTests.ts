import '@testing-library/jest-dom';

Object.defineProperty( process.env, 'env', {
    value: {
      VITE_WS_URL: 'ws://localhost:1234' // Mock value
    },
  });