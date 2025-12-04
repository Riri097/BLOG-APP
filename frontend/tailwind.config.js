/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        background: '#F8F9FA', 
        text: '#212121',       
        primary: '#4A90E2',   
        accent: '#FFB74D',     
      }
    },
  },
  plugins: [],
}