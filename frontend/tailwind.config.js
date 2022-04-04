const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // purge: {
  //   enabled: true,
  //   constent: [],
  //   options: {
  //     safeList: [
  //     ],
  //   },
  // },

  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },

      fill: (theme) => theme('colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
