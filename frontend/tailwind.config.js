/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0d1b2aff',
        'oxford-blue': '#1b263bff',
        'yinmn-blue': '#415a77ff',
        'silver-lake-blue': '#778da9ff',
        'platinum': '#e0e1ddff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(13, 27, 42, 0.1), 0 2px 4px -1px rgba(13, 27, 42, 0.06)',
      }
    },
  },
  plugins: [],
}