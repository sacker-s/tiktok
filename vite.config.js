import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change the base path below to your GitHub repository name before deploying.
// Example: if your repo is https://github.com/yourname/tiktok-customer-feed
// then use base: "/tiktok-customer-feed/"
export default defineConfig({
  plugins: [react()],
  base: "/tiktok-customer-feed/",
});
