import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: '.vite-cache',
  server: {
    proxy: {
      '/api': {
        target: 'https://myportfolio-backend-kw19.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js isolated — largest single dep (~600KB)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Chart.js isolated
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          // Animation libraries
          'motion-vendor': ['framer-motion', 'gsap', 'lenis'],
          // Icon packs
          'icon-vendor': ['react-icons', 'lucide-react'],
          // Form + validation
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'chart.js',
      'react-chartjs-2',
    ],
  },
})
