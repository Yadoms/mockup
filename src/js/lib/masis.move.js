import { MasisPosition, MasisSort } from 'masis';

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function MasisMove(Masis, options = {}) {
  if (options.attr == null) options.attr = 'data-sort';
  if (options.class == null) options.class = 'ghost';
  let $ghost;
  let positions = {};
  const hackPopulate = (Masis) => {
    Masis.$children = [];
    let children = Masis.$element.children;
    Array.from(children).forEach(($el, i) => {
      if ($el.nodeType !== 8 && !$el.classList.contains(options.class))
      {
        if (!$el.hasAttribute(options.attr))
          $el.setAttribute(options.attr, 's-' + pad(i, 4, '0'));
        Masis.$children.push($el);
      }
    });
    Masis.$actives = Masis.$children;
    return Masis.view();
  };
  const moveGhost = (ev) => {
    let newX = ev.pageX,
      newY = ev.pageY;
    newX -= 90;
    newY -= 50;
    $ghost.style.left = newX + 'px';
    $ghost.style.top = newY + 'px';
  };
  const createGhost = (ev) => {
    $ghost = event.target;
    ev.dataTransfer.setDragImage($ghost, -99999, -99999);
    $ghost.classList.add(options.class);
    MasisPosition(hackPopulate(Masis));
  };
  const removeGhost = (ev) => {
    $ghost.classList.remove(options.class);
    moveGhost(ev);
    MasisPosition(MasisSort(hackPopulate(Masis), "[data-sort]"));
  };

  document.addEventListener('dragstart', createGhost, false);
  document.addEventListener('dragend', removeGhost, false);
  document.addEventListener('drag', moveGhost, false);

  return hackPopulate(Masis);
}
