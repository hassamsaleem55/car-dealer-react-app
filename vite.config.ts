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
      modulePreload: {
        polyfill: false,
        resolveDependencies: (_filename, deps) => {
          // Only preload React core - everything else lazy loads
          return deps.filter(dep => 
            dep.includes('react.js') || 
            dep.includes('react-dom') || 
            dep.includes('router')
          );
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Core React
            if (id.includes('node_modules/react/') && !id.includes('react-dom') && !id.includes('react-router') && !id.includes('react-qr')) {
              return 'react';
            }
            if (id.includes('node_modules/react-dom/')) {
              return 'react-dom';
            }
            if (id.includes('node_modules/react-router')) {
              return 'router';
            }
            
            // Heavy libraries - separate chunks
            if (id.includes('node_modules')) {
              if (id.includes('framer-motion')) return 'framer';
              if (id.includes('swiper')) return 'swiper';
              if (id.includes('lucide-react')) return 'icons';
              if (id.includes('moment')) return 'moment';
              if (id.includes('jsonwebtoken') || id.includes('jws') || id.includes('jwa')) return 'jwt';
              if (id.includes('qr')) return 'qr';
              if (id.includes('slick')) return 'slick';
              if (id.includes('sonner')) return 'toast';
              return 'vendor';
            }
            
            // Pages
            if (id.includes('/sections/home/')) return 'home';
            if (id.includes('/sections/stock/')) return 'stock';
            if (id.includes('/sections/car-details/')) return 'details-page';
            
            // Shared sections
            if (id.includes('/sections/shared/')) {
              if (id.includes('featured') || id.includes('brand')) return 'shared-a';
              if (id.includes('testimonial') || id.includes('faq')) return 'shared-b';
              return 'shared-c';
            }
            
            // Components
            if (id.includes('/components/car-card')) return 'card';
            if (id.includes('/components/filter')) return 'filter';
            if (id.includes('/components/car-details')) return 'details';
          },
        },
      },
      minify: 'esbuild',
      cssMinify: 'lightningcss',
      target: 'es2020',
      chunkSizeWarningLimit: 250,
      sourcemap: false,
      cssCodeSplit: true,
      reportCompressedSize: false,
      assetsInlineLimit: 4096,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
      exclude: [],
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  };
});
