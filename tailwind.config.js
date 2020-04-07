module.exports = {
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus'],
    boxShadow: ['responsive', 'hover', 'focus'],
    width: ['responsive', 'hover'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
  theme: {
    extend: {
      fontSize: {
        '3xs': '.5rem',
        '2xs': '.625rem',
      },
      opacity: {
        12: 0.12,
      },
      width: {
        96: '24rem',
        128: '32rem',
        144: '36rem',
      },
      height: {
        96: '24rem',
        128: '32rem',
        144: '36rem',
      },
      transitionProperty: {
        full: 'all',
        coord: 'left, top, opacity'
      },
      transitionTimingFunction: {
        'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
};
