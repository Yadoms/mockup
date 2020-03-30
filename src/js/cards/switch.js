import { ready, findAll } from '../functions';

function switchToggleCheck(ev) {
  ev.stopPropagation();
  let $input = ev.currentTarget.querySelector('input');
  let $round = ev.currentTarget.querySelector('.round');
  if ($input.hasAttribute('checked'))
  {
    $input.removeAttribute('checked');
    $round.classList.remove('transform');
    $round.classList.remove('translate-x-full');
  }
  else
  {
    $input.setAttribute('checked', 'checked');
    $round.classList.add('transform');
    $round.classList.add('translate-x-full');
  }
}

ready( () => {
  let $switch_buttons = findAll('.switch-button');
  if ($switch_buttons.length)
    $switch_buttons.forEach($button => {
      $button.addEventListener('click', (ev) => {
        ev.preventDefault();
        let $el = ev.currentTarget;
        if ($el.classList.contains('active'))
          $el.classList.remove('active');
        else
        $el.classList.add('active');
        ev.stopPropagation();
      }, false);
    });

  let $switch_toggles = findAll('.switch-toggle');
  if ($switch_toggles.length)
    $switch_toggles.forEach($switch_toggle => {
      $switch_toggle.querySelector('span.relative').addEventListener('click', switchToggleCheck);
    });
});