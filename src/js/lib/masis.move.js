import { MasisPosition } from 'masis';

export function MasisMove(Masis, options = {}) {
  if (options.attr == null) options.attr = 'data-sort';
  let $ghost;
  const ghostClass = String.fromCodePoint(0x1f47b);
  const hackPopulate = (Masis) => {};
  const moveGhost = (ev) => {
    const rect = $ghost.getBoundingClientRect();
    let newX = ev.pageX,
      newY = ev.pageY;
    newX -= rect.width;
    newY -= rect.height;
    $ghost.style.left = newX + 'px';
    $ghost.style.top = newY + 'px';
  };

  document.addEventListener(
    'dragstart',
    (ev) => {
      $ghost = event.target;
      ev.dataTransfer.setDragImage($ghost, -99999, -99999);
      $ghost.classList.add(ghostClass);
    },
    false
  );
  document.addEventListener(
    'dragend',
    (ev) => {
      $ghost.classList.remove(ghostClass);
      moveGhost(ev);
      MasisPosition(Masis);
    },
    false
  );

  document.addEventListener(
    'drag',
    (ev) => {
      moveGhost(ev);
    },
    false
  );

  return Masis.populate();
}
