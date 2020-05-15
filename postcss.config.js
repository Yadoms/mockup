const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.pug', './src/**/*.ts'],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!cursor-move).+-move$/,
    /^router-link(|-exact)-active$/,
    /^card-width-\d+$/,
    /^card-height-\d+$/,
    /^font-mono$/,
    /joliePosition/,
    /^red$/,
    /^blue$/,
    /^red-bg$/,
    /^blue-bg$/,
    /:root/,
    /^shadow/,
    /^text-shadow/,
    /^transform$/,
    /glass/,
    /$digital/,
    /neumorphism/,
    /^:focus$/,
    /^::-webkit/,
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/,
  ],
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
