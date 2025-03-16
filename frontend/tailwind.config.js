module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
        'particle-field': 'particle-field 20s linear infinite',
        'blob': 'blob 12s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotateX(0) rotateY(0)' },
          '50%': { transform: 'translateY(-5px) rotateX(3deg) rotateY(2deg)' },
        },
        'particle-field': {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '100%': { transform: 'translateY(-100vh) translateX(100vw)' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(100px, -50px) scale(1.1)' },
          '50%': { transform: 'translate(80px, 80px) scale(0.9)' },
          '75%': { transform: 'translate(-60px, 100px) scale(1.2)' },
        }
      }
    }
  },
  plugins: [],
}