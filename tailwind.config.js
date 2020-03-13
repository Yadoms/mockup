module.exports = {
  theme: {
    extend: {},
    inset: {},
    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      md: ' 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg: ' 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl: ' 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, .3)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      outline: '0 0 0 3px rgba(66,153,225,0.5)',
      focus: '0 0 0 3px rgba(66,153,225,0.5)',
      'none': 'none',
      'white': '0 1px 3px 0 rgba(81, 81, 81, .1), 0 1px 2px 0 rgba(81, 81, 81, .06)',
      'md-white': ' 0 4px 6px -1px rgba(81, 81, 81, .1), 0 2px 4px -1px rgba(81, 81, 81, .06)',
      'lg-white': ' 0 10px 15px -3px rgba(81, 81, 81, .1), 0 4px 6px -2px rgba(81, 81, 81, .05)',
      'xl-white': ' 0 20px 25px -5px rgba(81, 81, 81, .1), 0 10px 10px -5px rgba(81, 81, 81, .04)',
      '2xl-white': '0 25px 50px -12px rgba(81, 81, 81, .25)',
      '3xl-white': '0 35px 60px -15px rgba(81, 81, 81, .3)',
      'inner-white': 'inset 0 2px 4px 0 rgba(81, 81, 81,0.06)',
      'outline-white': '0 0 0 3px rgba(189, 202, 30, 0.5)',
      'focus-white': '0 0 0 3px rgba(189, 202, 30, 0.5)',
    }
  },
  variants: {
    backgroundColor: [
      'responsive', 
      'hover',
      'focus',
      'dark', 
      'dark-hover',
      'dark-focus'
    ],
    borderColor: [
      'responsive', 
      'hover',
      'focus',
      'dark', 
      'dark-hover', 
      'dark-focus'
    ],
    textColor: [
      'responsive', 
      'hover',
      'focus',
      'dark', 
      'dark-hover', 
      'dark-focus'
    ],
    boxShadow: [
      'responsive', 
      'hover',
      'focus',
      'dark', 
      'dark-hover',
      'dark-focus'
    ],
    width: [
      'responsive',
      'hover'
    ]
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
}
