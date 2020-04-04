const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const pug = require('gulp-pug');
const purgecss = require('gulp-purgecss');
const budo = require('budo');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const addSrc = require('gulp-add-src');
const clean = require('del');
const webpack = require('webpack-stream');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const path = require('path');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

function html() {
  return src('src/pug/*.pug').pipe(pug()).pipe(dest('dest'));
}

function cssLib() {
  return src(['src/lib/main.css'])
    .pipe(postcss([tailwindcss('./tailwind.config.js'), autoprefixer()]))
    .pipe(dest('debug/beforePurge'))
    .pipe(
      purgecss({
        content: ['dest/**/*.html', 'dest/**/*.js'],
        defaultExtractor: (content) => {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ''
          );
          return (
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
          );
        },
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
        ],
      })
    )
    .pipe(addSrc(['src/lib/**/*.css', '!src/lib/main.css']))
    .pipe(concat('lib.min.css'))
    .pipe(minifyCSS())
    .pipe(dest('dest/css'));
}

function css() {
  return src(['src/less/*.less', '!src/less/_*.less'])
    .pipe(less())
    .pipe(
      purgecss({
        content: ['dest/**/*.html', 'dest/**/*.js'],
        defaultExtractor: (content) => {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ''
          );
          return (
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
          );
        },
      })
    )
    .pipe(minifyCSS())
    .pipe(
      rename((path) => {
        path.basename += '.min';
      })
    )
    .pipe(dest('dest/css'));
}

function fonts() {
  return src([
    'src/lib/fontawesome/webfonts/*.*',
    'src/lib/DSEG/DSEG7-Modern-MINI/*.woff',
  ]).pipe(dest('dest/webfonts'));
}

function js() {
  return src('src/js/entry.js')
    .pipe(
      webpack({
        entry: {
          main: './src/js/entry.js',
        },
        output: {
          filename: 'app.min.js',
          publicPath: '/js/',
          path: path.resolve(__dirname, 'dist/js'),
        },
        mode: 'production',
        resolve: {
          plugins: [PnpWebpackPlugin],
        },
        resolveLoader: {
          plugins: [PnpWebpackPlugin.moduleLoader(module)],
        },
      })
    )
    .pipe(dest('dest/js'));
}

function server() {
  watch('src/less/**/*.less', css);
  watch('src/js/**/*.js', js);
  watch('src/pug/**/*.pug', series(html, css));
  budo({
    live: true,
    dir: 'dest',
    port: 9966,
    open: true,
  });
}

function cleanDest() {
  return clean(['dest', 'debug']);
}

function preview() {
  budo({
    live: true,
    dir: 'dest',
    port: 9966,
    open: true,
  });
}

function img() {
  return src('src/img/**/*.*').pipe(imagemin()).pipe(dest('dest/img'));
}

exports.default = series(cleanDest, html, js, cssLib, css, fonts, img, server);
exports.css = css;
exports.js = js;
exports.html = html;
exports.preview = preview;
