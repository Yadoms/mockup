if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
)
  document.querySelector('link[id="theme"]').href = '/css/dark.min.css';
else document.querySelector('link[id="theme"]').href = '/css/light.min.css';
