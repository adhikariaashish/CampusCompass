/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102A43',
        teal: '#0F766E',
        cream: '#FBF8F2',
        amber: '#E6A93E',
        mist: '#E9F4F1',
      },
      boxShadow: {
        soft: '0 12px 35px rgba(16, 42, 67, 0.08)',
        lift: '0 18px 44px rgba(16, 42, 67, 0.14)',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
