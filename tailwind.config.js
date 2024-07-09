/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                pregular: ["SFPRODISPLAYREGULAR", "sans-serif"],
                pmedium: ["SFPRODISPLAYMEDIUM_0", "sans-serif"],
                pbold: ["SFPRODISPLAYBOLD", "sans-serif"],
              },
        },
      },
      plugins: [],
  };