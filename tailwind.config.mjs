/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        mesh: {
          green: '#1a8a50',
          'green-light': '#67ea94',
          bg: '#0f1117',
          surface: '#1a1d27',
          text: '#e2e8f0',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
