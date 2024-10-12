import { defineConfig } from 'wxt';
export default defineConfig({
  manifest: {
    host_permissions: ['*://*.linkedin.com/*'],
  },
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    css: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }),
});
