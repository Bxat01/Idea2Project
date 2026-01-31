/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 2s ease infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
          },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'slide-in': {
          from: { 
            opacity: '0',
            transform: 'translateX(-20px)' 
          },
          to: { 
            opacity: '1',
            transform: 'translateX(0)' 
          },
        },
        'fade-in-up': {
          from: { 
            opacity: '0',
            transform: 'translateY(20px)' 
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)' 
          },
        },
      },
    },
  },
  plugins: [],
}