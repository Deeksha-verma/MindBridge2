/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        skin: '#FBE3E2', // Peach or skin-like shade
      },
      animation: {
        typewriter: 'typewriter 4s steps(22) 1s normal both, blink 1s step-end 4s 1 normal forwards',
        animation: {
        fade: "fade 1s ease-in-out",
        pulseSlow: "pulse 4s infinite",
      },
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0ch' },
          '100%': { width: '21ch' },
        },
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' },
        },
      },
    },
  },
  plugins: [],
}

