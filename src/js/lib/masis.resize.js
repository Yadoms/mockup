import { MasisPosition } from 'masis';
import { triggerEvent } from '../functions';

export function MasisResize(Masis, options) {
  let onResize = false;
  let $element;
  let offsetX, offsetY, previousX, previousY;

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
    if ($element) {
      $element.classList.remove(options.active);
      options.callbackEnd($element);
    }
    $element = null;
  };

  const resize = (ev) => {
    if (!onResize) return;
    ev.preventDefault();
    if ($element != null) {
      let width = options.breakpoints.width.length - 1;
      let height = options.breakpoints.height.length - 1;
      offsetX += ev.pageX - previousX;
      offsetY += ev.pageY - previousY;
      previousX = ev.pageX;
      previousY = ev.pageY;
      for (let i in options.breakpoints.width)
        if (options.breakpoints.width[i] > Math.abs(offsetX)) {
          width = parseInt(i);
          break;
        }
      for (let i in options.breakpoints.height)
        if (options.breakpoints.height[i] > Math.abs(offsetY)) {
          height = parseInt(i);
          break;
        }
      if (offsetX < 0) width *= -1;
      if (offsetY < 0) height *= -1;
      options.callbackMove($element, width, height);
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
