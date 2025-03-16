module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotateX(0) rotateY(0)' },
          '50%': { transform: 'translateY(-5px) rotateX(3deg) rotateY(2deg)' },
        }
      }
    }
  },
  plugins: [],
}