export function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export function findCardTitle($element) {
  return $element.parentNode.parentNode.querySelector('.card-title');
}

export function changeCardTitle($element, content) {
  let $cardtitle = findCardTitle($element);
  $cardtitle.classList.remove('hidden');
  let $title = $cardtitle.querySelector('.title');
  $title.innerHTML = content;
  if (content == '') $cardtitle.classList.add('no-border');
  else $cardtitle.classList.remove('no-border');
}

export function findAll(selector) {
  return document.querySelectorAll(selector);
}

export function changeTheme(theme) {
  document.querySelector('link[id="theme"]').href = `/css/${theme}.min.css`;
}

export function triggerEvent(eventName, data = {}) {
  if (window.CustomEvent && typeof window.CustomEvent === 'function') {
    var event = new CustomEvent(eventName, { detail: data });
  } else {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
  }
  document.dispatchEvent(event);
}
