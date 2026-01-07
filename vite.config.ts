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
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'animations': ['framer-motion'],
            'ui': ['swiper', 'lucide-react'],
          },
        },
      },
      minify: 'esbuild',
      cssMinify: 'lightningcss',
      target: 'es2020',
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      cssCodeSplit: true,
      reportCompressedSize: false,
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
