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
const path = require('path');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const scaleImages = require('gulp-scale-images');
const flatMap = require('flat-map').default;
const postcssImport = require('postcss-import');
const uglify = require('gulp-uglify-es').default;

function html() {
  return src('src/pug/*.pug').pipe(pug()).pipe(dest('dest'));
}

function cssLib() {
  return src(['src/lib/**/*.css'])
    .pipe(concat('lib.min.css'))
    .pipe(minifyCSS())
    .pipe(dest('dest/css'));
}

function css() {
  return src(['src/less/*.less', '!src/less/_*.less'])
    .pipe(less())
    .pipe(
      postcss([
        postcssImport(),
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
      ])
    )
    .pipe(dest('debug/beforePurge'))
    .pipe(
      purgecss({
        content: ['dest/**/*.html', 'dest/js/**/*.js'],
        defaultExtractor: (content) => {
          return content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
        },
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /^card-width-\d+$/,
          /^card-height-\d+$/,
          /^font-mono$/,
          /^mono-font-/,
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
  return src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(dest('dest/js'));
}

function server() {
  watch('src/less/**/*.less', css);
  watch('src/js/**/*.js', js);
  watch('src/components/*.mjs', series(copyComponents, copyComponentLibs));
  watch('src/yadoms.instance.json', copy);
  watch('src/pug/**/*.pug', series(html, cssLib, css));
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

const computeScaleInstructions = (file, cb) => {
  const jpegFile = file.clone();
  jpegFile.scale = { maxWidth: 640, maxHeight: 640, format: 'jpeg' };
  cb(null, [jpegFile]);
};

const computeFileName = (output, scale, cb) => {
  const fileName = [
    path.basename(output.path, output.extname), // strip extension
    scale.format || output.extname,
  ].join('.');
  cb(null, fileName);
};

function img() {
  return src('src/img/backgrounds/*.*')
    .pipe(flatMap(computeScaleInstructions))
    .pipe(scaleImages(computeFileName))
    .pipe(addSrc('src/img/*.*'))
    .pipe(imagemin())
    .pipe(dest('dest/img'));
}

function copy() {
  return src(['src/yadoms.instance.json']).pipe(dest('dest'));
}

function copyComponentLibs() {
  return src(['src/components/lib/**/*.*']).pipe(dest('dest/components/lib'));
}

function copyComponents() {
  return src(['src/components/*.mjs'])
    .pipe(uglify())
    .pipe(dest('dest/components/'));
}

exports.default = series(
  cleanDest,
  copy,
  copyComponentLibs,
  copyComponents,
  html,
  js,
  cssLib,
  css,
  fonts,
  img,
  server
);

exports.clean = cleanDest;
exports.copy = copy;
exports.css = css;
exports.cssLib = cssLib;
exports.html = html;
exports.img = img;
exports.js = js;
exports.preview = preview;
