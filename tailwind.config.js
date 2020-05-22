module.exports = {
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus'],
    boxShadow: ['responsive', 'hover', 'focus'],
    width: ['responsive', 'hover'],
  },
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
        card: 'left, top, opacity, width, height',
      },
      transitionTimingFunction: {
        'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.pug', './src/**/*.ts'],
  },
};
