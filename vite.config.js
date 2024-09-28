import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// vitejs.dev/config/
export default defineConfig(({ mode }) => {
return {
define: {
'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
},
plugins: [react()],
};
});