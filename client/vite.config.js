// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0', // Listen on all network interfaces
//     port: 5173,
//     https: {
//       key: fs.readFileSync('./localhost-key.pem'),
//       cert: fs.readFileSync('./localhost.pem'),
//     },
//   },
// });


// client/vite.config.js - NEW CODE
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Import the polyfill
import fs from 'fs';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
      nodePolyfills({
        // Enable the Buffer polyfill globally
        globals: {
          Buffer: true,
        },
      }),
    ],
  };

  // This conditional logic you added is perfect and stays the same
  if (command === 'serve') {
    try {
      config.server = {
        host: '0.0.0.0',
        port: 5173,
        https: {
          key: fs.readFileSync('./localhost-key.pem'),
          cert: fs.readFileSync('./localhost.pem'),
        },
      };
    } catch (e) {
      console.warn('HTTPS certs not found, running in HTTP mode. WebRTC may fail.');
    }
  }

  return config;
});
