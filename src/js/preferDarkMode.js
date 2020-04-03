if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
)
  document.documentElement.classList.add("yadoms_theme_dark");
else document.documentElement.classList.remove("yadoms_theme_dark");
