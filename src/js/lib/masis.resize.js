import { MasisPosition } from 'masis';
import { triggerEvent } from '../functions';

export function MasisResize(Masis, options) {
  Masis.$children.forEach(($el) => {
    $el.classList.add(options.class);
  });
  return Masis;
}
