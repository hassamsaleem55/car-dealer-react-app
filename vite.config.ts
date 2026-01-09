import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { compression } from 'vite-plugin-compression2';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
// @ts-ignore - no types available
import imageminWebp from 'imagemin-webp';
// @ts-ignore - no types available
import imageminMozjpeg from 'imagemin-mozjpeg';
// @ts-ignore - no types available
import imageminPngquant from 'imagemin-pngquant';

import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const activeDealer = env.VITE_DEALER;

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Brotli compression for better compression ratio
      compression({
        include: /\.(js|css|html|svg)$/,
        threshold: 1024,
        algorithms: ['brotliCompress'],
        deleteOriginalAssets: false,
      }),
      // Gzip compression as fallback
      compression({
        include: /\.(js|css|html|svg)$/,
        threshold: 1024,
        algorithms: ['gzip'],
        deleteOriginalAssets: false,
      }),
      // Image optimization
      viteImagemin({
        plugins: {
          jpg: imageminMozjpeg({ quality: 80 }),
          png: imageminPngquant({ quality: [0.7, 0.8], speed: 4 }),
        },
        makeWebp: {
          plugins: {
            jpg: imageminWebp({ quality: 75 }),
            png: imageminWebp({ quality: 75 }),
          },
        },
      }),
    ],
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
        polyfill: true,
        resolveDependencies: (_filename, deps) => {
          // Preload critical chunks
          return deps.filter(dep => 
            dep.includes('react') || 
            dep.includes('router') ||
            dep.includes('home') ||
            dep.includes('vendor')
          );
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Core React - highest priority
            if (id.includes('node_modules/react/') && !id.includes('react-dom') && !id.includes('react-router') && !id.includes('react-qr')) {
              return 'react';
            }
            if (id.includes('node_modules/react-dom/')) {
              return 'react-dom';
            }
            if (id.includes('node_modules/react-router')) {
              return 'router';
            }
            
            // Heavy libraries - separate chunks for better caching
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
            
            // Page-based chunks for better code splitting
            if (id.includes('/sections/home/')) return 'home';
            if (id.includes('/sections/stock/')) return 'stock';
            if (id.includes('/sections/car-details/')) return 'details-page';
            
            // Shared sections - split into smaller chunks
            if (id.includes('/sections/shared/')) {
              if (id.includes('featured') || id.includes('brand')) return 'shared-a';
              if (id.includes('testimonial') || id.includes('faq')) return 'shared-b';
              return 'shared-c';
            }
            
            // Component chunks
            if (id.includes('/components/car-card')) return 'card';
            if (id.includes('/components/filter')) return 'filter';
            if (id.includes('/components/car-details')) return 'details';
          },
          // Optimize chunk file names for better caching
          chunkFileNames: () => {
            return `assets/js/[name]-[hash].js`;
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name || '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.css$/.test(assetInfo.name || '')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
        // Optimize tree-shaking
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
      minify: 'esbuild',
      cssMinify: 'lightningcss',
      target: 'es2020',
      chunkSizeWarningLimit: 200,
      sourcemap: false,
      cssCodeSplit: true,
      reportCompressedSize: true,
      assetsInlineLimit: 4096,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      treeShaking: true,
    },
    // Server configuration for development
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000',
      },
    },
    // Preview configuration
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=31536000',
      },
    },
  };
});
