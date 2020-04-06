import { ready, findAll } from './functions';
import { Masis, MasisPosition } from 'masis';

ready(() => {
  let $cards = findAll('.card');
  if ($cards.length)
    $cards.forEach(($card) => {
      const $component = $card.querySelector('.card-wrapper > div');
      $component.classList.forEach(cl => {
        if (cl.match(/w-\d+/))
          $card.querySelector('.card-title').classList.add(cl);
      })
    });

  var m = new Masis('#cards');
  setTimeout(() => {
    MasisPosition(m, {
      pad: 8
    });

    const resizeObserver = new ResizeObserver((entries) => {
      MasisPosition(m, {
        pad: 8
      });
    });

    resizeObserver.observe(document.querySelector('#cards'));
  }, 500);
});
