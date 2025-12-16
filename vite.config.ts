import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },

  server: {
    host: true,
  },

  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
});
