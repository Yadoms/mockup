import { MasisPosition } from 'masis';
import { triggerEvent } from '../functions';

export function MasisResize(Masis, options) {
  Masis.$children.forEach(($el) => {
    let $div = document.createElement('div');
    $div.classList.add(options.class);
    $el.appendChild($div);
  });
  return Masis;
}
