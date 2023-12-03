import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            all: true
        },
        include: [
            './tests/unit/**/*.test.js',
            './tests/integration/**/*.test.js',
        ]
    },
});
