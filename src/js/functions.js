export function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

export function findCardTitle($element) {
  return $element.parentNode.parentNode.parentNode.querySelector(
    "div:first-child"
  );
}

export function changeCardTitle($element, content) {
  let $title = findCardTitle($element);
  $title.classList.remove("hidden");
  let $p = $title.querySelector("p");
  $p.innerHTML = content;
  if (content == "") $p.classList.add("no-border");
  else $p.classList.remove("no-border");
}

export function findAll(selector) {
  return document.querySelectorAll(selector);
}

export function changeTheme(theme) {
  document.querySelector('link[id="theme"]').href = `/css/${theme}.min.css`;
}