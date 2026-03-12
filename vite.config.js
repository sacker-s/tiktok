import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change the base path below to your GitHub repository name before deploying.
export default defineConfig({
  plugins: [react()],
  base: "/tiktok/",
});
