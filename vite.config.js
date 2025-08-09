import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://employee-onboarding-api.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
