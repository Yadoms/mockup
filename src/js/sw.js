const sw = 'service-worker.js';
(function () {
  if (!('serviceWorker' in navigator)) {
    return;
  }
  navigator.serviceWorker
    .register(sw)
    .then(function (registration) {})
    .catch(function (error) {});
})();
