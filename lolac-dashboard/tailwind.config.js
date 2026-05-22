export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0ab6ff',
        surface: '#111827',
        panel: '#0b1220',
        accent: '#0d9eff'
      },
      boxShadow: {
        glow: '0 0 40px rgba(10,182,255,0.12)'
      }
    }
  },
  plugins: []
};
