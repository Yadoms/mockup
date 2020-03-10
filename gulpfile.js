const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const pug = require('gulp-pug');
const purgecss = require('gulp-purgecss');
const budo = require('budo');
const gap = require('gulp-append-prepend');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

function html() {
  return src('src/pug/*.pug')
    .pipe(pug())
    .pipe(dest('dest'));
}

function css() {
  return src('src/less/*.less')
    .pipe(less())
    .pipe(gap.prependText('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n@tailwind screens;\n'))
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer(),
    ]))
    .pipe(purgecss({
      content: ['dest/**/*.html'],
      defaultExtractor: (content) => {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
      },
      whitelistPatterns: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!cursor-move).+-move$/, /^router-link(|-exact)-active$/ ],
    }))
    .pipe(minifyCSS())
    .pipe(dest('dest/css'));
}

function server()
{
  watch('src/less/**/*.less', css);
  watch('src/pug/**/*.pug', series(html, css));
  budo({
    live: true,
    dir: 'dest',
    port: 9966,
    //ssl: true,
    open: true
  });
}

exports.css = css;
exports.default = series(html, css, server);
exports.html = html;