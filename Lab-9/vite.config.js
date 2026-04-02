import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        ex1: resolve(__dirname, "Ex-1/index.html"),
        ex2: resolve(__dirname, "Ex-2/index.html"),
        ex3: resolve(__dirname, "Ex-3/index.html")
      }
    }
  }
});
