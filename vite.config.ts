import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const activeDealer = env.VITE_DEALER;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@dealers-dir": path.resolve(__dirname, `./dealers/${activeDealer}`),
        "@app-layout-dir": path.resolve(__dirname, "./src/app-layouts"),
        "@components-dir": path.resolve(__dirname, "./src/components"),
        "@core-dir": path.resolve(__dirname, "./src/core"),
        "@elements-dir": path.resolve(__dirname, "./src/elements"),
        "@sections-dir": path.resolve(__dirname, "./src/sections"),
        "@types-dir": path.resolve(__dirname, "./src/types"),
      },
    },
    build: {
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer-motion': ['framer-motion'],
            'swiper': ['swiper'],
            // Icon library (lucide-react) will be in its own chunk
            'icons': ['lucide-react'],
          },
        },
      },
      // Optimize for production
      minify: 'esbuild',
      cssMinify: true,
      // Target modern browsers for smaller bundle
      target: 'es2020',
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      // Enable source maps for production debugging (disable in production if not needed)
      sourcemap: false,
    },
    // Optimize dependencies pre-bundling
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'swiper',
      ],
      exclude: ['lucide-react'],
    },
  };
});
