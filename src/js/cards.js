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
        if (cl.match(/card-width-\d+/)) {
          $card.querySelector('.card-title').classList.add(cl);
          $card.dataset.cardWidth = cl.replace('card-width-', '');
          //@TODO : this following value must be set in Vue
          $card.dataset.cardMinWidth = cl.replace('card-width-', '');
        } else if (cl.match(/card-height-\d+/)) {
          $card.dataset.cardHeight = cl.replace('card-height-', '');
          //@TODO : this following value must be set in Vue
          $card.dataset.cardMinHeight = cl.replace('card-height-', '');
        }
      });
    });

  const maxCardWidthSize = 5;
  const maxCardHeightSize = 5;

  const positionOptions = {
    pad: 154,
  };

  var m = new Masis('#cards');
  setTimeout(() => {
    MasisMove(m, {
      class: '🏄',
      ghost: '👻',
      exclude: '🤖',
    });

    let breakpoints = {
      width: [],
      height: [],
    };
    for (let i = 1; i <= Math.max(maxCardWidthSize, maxCardHeightSize); i++) {
      const $div = createCard(
        Math.min(i, maxCardWidthSize),
        Math.min(i, maxCardHeightSize)
      );
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
      class: '📐',
      active: '📜',
      selector: '.card-wrapper > div',
      breakpoints: breakpoints,
      callbackMove: ($card, w, h) => {
        let newW = parseInt(w) + parseInt($card.dataset.cardWidth);
        let newH = parseInt(h) + parseInt($card.dataset.cardHeight);
        if (newW < parseInt($card.dataset.cardMinWidth))
          newW = parseInt($card.dataset.cardMinWidth);
        if (newH < parseInt($card.dataset.cardMinHeight))
          newH = parseInt($card.dataset.cardMinHeight);
        if (newW > maxCardWidthSize) newW = maxCardWidthSize;
        if (newH > maxCardHeightSize) newW = maxCardHeightSize;
        resizeCard($card.querySelector('.card-title'), newW, newH);
        resizeCard(
          $card.querySelector('.card-wrapper > div'),
          newW,
          newH,
          true
        );
        $card.dataset.cardTmpWidth = newW;
        $card.dataset.cardTmpHeight = newH;
        MasisPosition(m);
      },
      callbackEnd: ($card) => {
        $card.dataset.cardWidth = $card.dataset.cardTmpWidth;
        $card.dataset.cardHeight = $card.dataset.cardTmpHeight;
      },
    });

    MasisPosition(m, positionOptions);

    const resizeObserver = new ResizeObserver((entries) => {
      MasisPosition(m, positionOptions);
    });

    resizeObserver.observe(document.querySelector('#cards'));

    // we remove drag classes to avoid some strange comportement
    m.$children.forEach(($el) => {
      $el.classList.remove('🏄');
    });
  }, 500);

  let wrenchState = false;
  document.querySelector('#button-design').addEventListener(
    'click',
    (ev) => {
      ev.preventDefault();
      wrenchState = !wrenchState;
      ev.currentTarget.classList.remove('active');
      if (wrenchState) {
        ev.currentTarget.classList.add('active');
        m.$children.forEach(($el) => {
          $el.classList.add('🏄');
        });
      } else {
        m.$children.forEach(($el) => {
          $el.classList.remove('🏄');
        });
      }
    },
    false
  );
});
