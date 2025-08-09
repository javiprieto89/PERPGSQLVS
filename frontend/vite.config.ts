// vite.config.js
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";

export default defineConfig({
  plugins: [graphqlLoader(), tailwindcss(), react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    cors: true,
    // Eliminamos proxy porque ahora llamamos directo a rutas como /login
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
