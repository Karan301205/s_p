/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#F9F8F4',
        forest: '#2D3A31',
        sage: '#8C9A84',
        clay: '#DCCFC2',
        stoneBorder: '#E6E2DA',
        terracotta: '#C27B66',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        'soft-sm': '0 4px 6px -1px rgba(45, 58, 49, 0.05)',
        'soft-md': '0 10px 15px -3px rgba(45, 58, 49, 0.05)',
        'soft-lg': '0 20px 40px -10px rgba(45, 58, 49, 0.05)',
        'soft-xl': '0 25px 50px -12px rgba(45, 58, 49, 0.15)',
      },
    },
  },
  plugins: [],
}
