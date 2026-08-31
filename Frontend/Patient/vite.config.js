import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      strategies: "injectManifest",

      srcDir: "src",
      filename: "sw.js",

      registerType: "autoUpdate",

      devOptions: {
        enabled: true,
        type: "module",
      },

      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],

      manifest: {
        name: "HVault - Secure Medical Ecosystem",
        short_name: "HVault",
        description:
          "Your secure clinical sanctuary for medical records and health insights",

        theme_color: "#006a64",
        background_color: "#ffffff",

        display: "standalone",
        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],

  server: {
    port: 3000,
    open: true,
  },
});