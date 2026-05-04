import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: change `base` to match your repo name on GitHub.
// If your repo is github.com/<user>/ledger, then base should be '/ledger/'.
// If you're deploying to a custom domain or using a user/org page, set base: '/'.
export default defineConfig({
  plugins: [react()],
  base: '/ledger/',
});
