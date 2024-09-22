/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'], 
      },

      colors: {
        Fundametal: "#40a02b",
        Medium:"#1E66F5",
        Difficult: "#e64553",
        light_bgb:"#ffffff",
        light_theme:"#179299",
        light_theme_click:"#1a9d9d",
        dark_bgb: "#000000",
        dark_theme: "#d08d2d",
        dark_theme_click: "#df8e1d",
        grey:"#BABABA",
      },
    },
  },
  plugins: [],
}

