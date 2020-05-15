module.exports = {
  gifsicle: { optimizationLevel: 2, interlaced: false, colors: 10 },
  mozjpeg: { progressive: true, quality: 75 },
  pngquant: { quality: [0.25, 0.5] },
  svgo: {
    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
  },
  webp: { quality: 10 },
};
