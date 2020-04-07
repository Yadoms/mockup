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

export function createCard(width, height) {
  let $div = document.createElement('div');
  let cls = [
    'card',
    'm-2',
    'rounded-lg',
    'p-1',
    'flex',
    'flex-col-reverse',
    'opacity-0',
    'absolute',
  ];
  $div.classList.add(...cls);
  $div.innerHTML = `
    <div class="card-title mt-1 pt-1 clearfix p-2 font-bold text-xs h-8 truncate card-width-1">
      <span class="title"></span>
    </div>
    <div class="card-wrapper flex-grow">
      <div class="card-width-${width} card-height-${height}">
      </div>
    </div>
  `;
  return $div;
}
