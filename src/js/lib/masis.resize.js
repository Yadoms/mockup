import { MasisPosition } from 'masis';
import { triggerEvent } from '../functions';

export function MasisResize(Masis, options) {
  let onResize = false;
  let $element;
  let offsetX, offsetY, previousX, previousY;
  let prevWidth, prevHeight;

  const createResize = (ev) => {
    onResize = true;
    $element = ev.currentTarget.parentNode;
    $element.classList.add(options.active);
    offsetX = 0;
    offsetY = 0;
    previousX = ev.pageX;
    previousY = ev.pageY;
  };

  const deleteResize = () => {
    onResize = false;
    $element.classList.remove(options.active);
    $element = null;
  };

  const resize = (ev) => {
    if (!onResize) return;
    ev.preventDefault();
    if ($element != null) {
      let width = 1;
      let height = 1;
      offsetX += ev.pageX - previousX;
      offsetY += ev.pageY - previousY;
      previousX = ev.pageX;
      previousY = ev.pageY;
      for (let i in options.breakpoints.width)
        if (options.breakpoints.width[i] > offsetX) {
          width = parseInt(i) + 1;
          break;
        }
      for (let i in options.breakpoints.height)
        if (options.breakpoints.height[i] > offsetY) {
          height = parseInt(i) + 1;
          break;
        }
      options.callback($element, width, height);
    }
  };

  Masis.$children.forEach(($el) => {
    let $div = document.createElement('div');
    $div.classList.add(options.class);
    $div.addEventListener('mousedown', createResize, false);
    $el.appendChild($div);
  });

  document.addEventListener('mousemove', resize, false);
  document.addEventListener('mouseup', deleteResize, false);

  return Masis;
}
