import { ready, findAll, createCard } from './functions';
import { Masis, MasisPosition } from 'masis';
import { MasisMove } from './lib/masis.move';
import { MasisResize } from './lib/masis.resize';

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
    pad: 154,
  };

  var m = new Masis('#cards');
  setTimeout(() => {
    MasisMove(m, {
      class: String.fromCodePoint(0x1f3c4),
      ghost: String.fromCodePoint(0x1f47b),
      exclude: String.fromCodePoint(0x1f4d0),
    });

    let breakpoints = {
      width: [],
      height: [],
    };
    for (let i = 1; i < 6; i++) {
      const $div = createCard(i, i);
      document.querySelector('body').appendChild($div);
      const style = getComputedStyle($div);
      const rect = $div.getBoundingClientRect();
      let $iw, $ih;
      $iw =
        parseInt(rect.width) +
        parseInt(style.marginLeft) +
        parseInt(style.marginRight);
      $ih =
        parseInt(rect.height) +
        parseInt(style.marginTop) +
        parseInt(style.marginBottom);
      breakpoints.width.push($iw);
      breakpoints.height.push($ih);
      document.querySelector('body').removeChild($div);
    }

    const resizeCard = ($el, width, height, setHeight = false) => {
      for (let i = 1; i < 6; i++) {
        $el.classList.remove(`card-width-${i}`);
        if (setHeight) $el.classList.remove(`card-height-${i}`);
      }
      $el.classList.add(`card-width-${width}`);
      if (setHeight) $el.classList.add(`card-height-${height}`);
    };

    MasisResize(m, {
      class: String.fromCodePoint(0x1f4d0),
      active: String.fromCodePoint(0x1f4dc),
      selector: '.card-wrapper > div',
      breakpoints: breakpoints,
      callback: ($card, w, h) => {
        resizeCard($card.querySelector('.card-title'), w, h);
        resizeCard($card.querySelector('.card-wrapper > div'), w, h, true);
        MasisPosition(m);
      },
    });

    MasisPosition(m, positionOptions);

    const resizeObserver = new ResizeObserver((entries) => {
      MasisPosition(m, positionOptions);
    });

    resizeObserver.observe(document.querySelector('#cards'));
  }, 500);
});
