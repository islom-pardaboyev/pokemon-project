/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff4640'
        },
        main: {
          DEFAULT: "#e4edf5",
          100: "#919191"
        }
      },
    },
    container: {
      center: true,
    },
    
  },
  plugins: [],
}