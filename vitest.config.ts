/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), {
        name: 'load-svg',
        enforce: 'pre',
        transform(_, id) {
            if (id.endsWith('.svg')) {
                return 'export default () => {}';
            }
        },
    },],
    test: {
        // 👋 add the line below to add jsdom to vite
        environment: 'jsdom',
        // hey! 👋 over here
        globals: true,
        setupFiles: './tests/setup.ts', // assuming the test folder is in the root of our project
    },
    // TODO: this is to make ecosystem work, remove when fixed
    server: {
        fs: {
            strict: false,
        },
    },
})