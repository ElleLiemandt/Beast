/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beast-orange': '#ff6b35',
        'beast-blue': '#4a90e2',
        'beast-green': '#7ed321',
        'beast-purple': '#9013fe',
        'beast-dark': '#1a1a2e',
        'beast-light': '#f8f9fa',
      },
      fontFamily: {
        'beast': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #ff6b35, 0 0 10px #ff6b35, 0 0 15px #ff6b35' },
          'to': { boxShadow: '0 0 10px #ff6b35, 0 0 20px #ff6b35, 0 0 30px #ff6b35' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
