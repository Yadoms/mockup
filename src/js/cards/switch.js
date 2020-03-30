import { ready, findAll } from '../functions';

ready( () => {
  let $switch_buttons = findAll('.card .switch-button');
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
    })
});