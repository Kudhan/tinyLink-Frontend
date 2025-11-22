/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f2ff',
          100: '#e9e5ff',
          200: '#cfc9ff',
          300: '#b5adff',
          400: '#8f84ff',
          500: '#6a59ff', // main purple
          600: '#5b4be6',
          700: '#4839b3',
          800: '#372a80',
          900: '#251b4d'
        },
        accent: {
          50: '#fff6ed',
          100: '#ffeddb',
          200: '#ffd5b0',
          300: '#ffb786',
          400: '#ff974f',
          500: '#ff7a1a', // orange accent
          600: '#e86612',
          700: '#b8440e',
          800: '#852f0a',
          900: '#581b06'
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#0b1220'
        }
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.08)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
