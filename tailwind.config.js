/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                pthin: ["Raleway-Thin", "sans-serif"],
                plight: ["Raleway-Light", "sans-serif"],
                pregular: ["Raleway-Regular", "sans-serif"],
                pmedium: ["Raleway-Medium", "jokerman"],
                psemibold: ["Raleway-SemiBold", "sans-serif"],
                pbold: ["Raleway-Bold", "sans-serif"],
                pextrabold: ["Raleway-ExtraBold", "sans-serif"],
                pblack: ["Raleway-Black", "sans-serif"],
              },
        },
      },
      plugins: [],
  };