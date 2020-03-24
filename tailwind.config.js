module.exports = {
  variants: {
    backgroundColor: [
      'responsive', 
      'hover',
      'focus'
    ],
    borderColor: [
      'responsive', 
      'hover',
      'focus'
    ],
    textColor: [
      'responsive', 
      'hover',
      'focus'
    ],
    boxShadow: [
      'responsive', 
      'hover',
      'focus'
    ],
    width: [
      'responsive',
      'hover'
    ]
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
