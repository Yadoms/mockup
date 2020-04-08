import { triggerEvent } from '../functions';
import { MasisPosition } from 'masis';

export function MasisDelete(Masis, options) {
  const removeChild = (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (confirm(options.message)) {
      triggerEvent('masis.delete', {
        element: ev.currentTarget.parentNode,
      });
      Masis.$element.removeChild(ev.currentTarget.parentNode);
      MasisPosition(Masis.populate());
    }
  };

  Masis.$children.forEach(($el) => {
    let $div = document.createElement('div');
    $div.classList.add(options.class);
    $div.addEventListener('mousedown', removeChild, false);
    $el.appendChild($div);
  });
}
