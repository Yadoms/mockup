import { findAll, ready } from '../functions';

function decrement(ev) {
  const $element = ev.currentTarget.parentNode,
        $input = $element.querySelector('input'),
        step   = Number($input.getAttribute('step')),
        min    = Number($input.getAttribute('min'));
  let value = Number($input.value),
      val = value - step;
  if (val < min)
    val = value;
  $input.value = val;
}

function increment(ev) {
  const $element = ev.currentTarget.parentNode,
        $input = $element.querySelector('input'),
        step   = Number($input.getAttribute('step')),
        max    = Number($input.getAttribute('max'));
  let value = Number($input.value),
      val = value + step;
  if (val > max)
    val = value;
  $input.value = val;
}

ready(() => {
  let $increments = findAll('.dimmer button[data-action="increment"]'),
      $decrements = findAll('.dimmer button[data-action="decrement"]');
  $increments.forEach($btn => {
    $btn.addEventListener('click', increment);
  });
  $decrements.forEach($btn => {
    $btn.addEventListener('click', decrement);
  });
});