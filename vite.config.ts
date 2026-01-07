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
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Critical vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('framer-motion')) {
                return 'framer-motion';
              }
              if (id.includes('swiper')) {
                return 'swiper';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              // All other vendors in one chunk to reduce requests
              return 'vendor';
            }
            // Separate chunks for large features
            if (id.includes('/sections/')) {
              return 'sections';
            }
            if (id.includes('/components/car-details/')) {
              return 'car-details';
            }
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      cssMinify: 'lightningcss',
      target: 'es2020',
      chunkSizeWarningLimit: 500,
      sourcemap: false,
      reportCompressedSize: false,
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
      exclude: ['lucide-react'],
    },
  };
});
