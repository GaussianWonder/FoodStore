module.exports = {
  purge: {
    enabled: true,
    constent: [],
    options: {
      safeList: [
        'relative',
        'absolute',
        'scale-50',
        'opacity-0',
        'pointer-events-none',
        'transition-all',
        'group-hover:opacity-100',
        'group-hover:pointer-events-auto',
        'group-hover:scale-100',
        'duration-150',
        'ml-1',
        '-mt-1',
        'group',
      ],
    },
  },

  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito'],
      },

      fill: (theme) => theme('colors'),
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('tailwind-scrollbar-hide')],
};
