import { ready, findAll } from './functions';
import { Masis, MasisPosition } from 'masis';
import { MasisMove } from './lib/masis.move';

ready(() => {
  let $cards = findAll('.card');
  if ($cards.length)
    $cards.forEach(($card) => {
      const $component = $card.querySelector('.card-wrapper > div');
      $component.classList.forEach((cl) => {
        if (cl.match(/card-width-\d+/))
          $card.querySelector('.card-title').classList.add(cl);
      });
    });

  const positionOptions = {
    pad: 100,
  };

  var m = new Masis('#cards');
  setTimeout(() => {
    MasisMove(m, {
      class: String.fromCodePoint(0x1f47b)
    });

    MasisPosition(m, positionOptions);

    const resizeObserver = new ResizeObserver((entries) => {
      MasisPosition(m, positionOptions);
    });

    resizeObserver.observe(document.querySelector('#cards'));
  }, 500);
});
