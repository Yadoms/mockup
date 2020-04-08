import { MasisPosition, MasisSort } from 'masis';
import { triggerEvent } from '../functions';

export function MasisMove(Masis, options = {}) {
  if (options.attr == null) options.attr = 'data-sort';
  if (options.ghost == null) options.ghost = 'ghost';
  let $ghost;
  let positions;
  let oldpos = '';
  let onDrag = false;
  const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };
  const joliNumber = (num) => {
    return `_${pad(num, 6, '0')}`;
  };
  const redefineSort = () => {
    Masis.$children.forEach(($el, i) => {
      $el.setAttribute(options.attr, joliNumber(i + 1));
    });
    return Masis;
  };
  const generatePositionsMap = () => {
    positions = {};
    Masis.$children.forEach(($el) => {
      let et = joliNumber($el.style.top.replace('px', ''));
      let el = joliNumber($el.style.left.replace('px', ''));
      if (typeof positions[et] == 'undefined') positions[et] = {};
      positions[et][el] = $el.getAttribute(options.attr);
    });
  };
  const moveGhost = (ev) => {
    if (!onDrag) return;
    ev.preventDefault();
    let newX = ev.pageX;
    let newY = ev.pageY;
    newX -= 90;
    newY -= 50;
    $ghost.style.left = newX + 'px';
    $ghost.style.top = newY + 'px';
    let _x = joliNumber(newX);
    let _y = joliNumber(newY);
    if (positions != null) {
      let positionsY = Object.keys(positions).reverse();
      let newPos = joliNumber(0);
      for (let i in positionsY)
        if (positionsY[i].localeCompare(_y) == -1) {
          let positionsX = Object.keys(positions[positionsY[i]]).reverse();
          for (let j in positionsX)
            if (positionsX[j].localeCompare(_x) == -1) {
              newPos =
                joliNumber(
                  parseInt(
                    positions[positionsY[i]][positionsX[j]].replace('_', '')
                  )
                ) + '_';
              break;
            }
          break;
        }
      if (newPos != oldpos) {
        let $robot = Masis.$element.querySelector('#' + options.exclude);
        if ($robot != null) Masis.$element.removeChild($robot);
        $robot = document.createElement('div');
        $robot.setAttribute('id', options.exclude);
        $robot.classList = $ghost.classList;
        $robot.classList.remove(options.ghost);
        $robot.innerHTML = $ghost.innerHTML;
        $robot.setAttribute(options.attr, newPos);
        Masis.$element.appendChild($robot);
        MasisPosition(MasisSort(Masis.populate(), '[data-sort]'));
        oldpos = newPos;
      }
    }
  };
  const createGhost = (ev) => {
    if (ev.currentTarget.classList.contains(options.exclude)) return;
    if (!ev.currentTarget.classList.contains(options.class)) return;
    onDrag = true;
    $ghost = event.currentTarget;
    Masis.$element.parentNode.appendChild($ghost);
    $ghost.classList.add(options.ghost);
    MasisPosition(Masis.populate());
    setTimeout(() => {
      generatePositionsMap();
    }, 200);
  };
  const removeGhost = (ev) => {
    if ($ghost != null) {
      $ghost.classList.remove(options.ghost);
      moveGhost(ev);
      let $robot = Masis.$element.querySelector('#' + options.exclude);
      $ghost.setAttribute(options.attr, $robot.getAttribute(options.attr));
      Masis.$element.removeChild($robot);
      Masis.$element.appendChild($ghost);
      MasisPosition(MasisSort(Masis.populate(), '[data-sort]'));
      redefineSort();
      oldpos = '';
      onDrag = false;
      triggerEvent('masis.moved');
    }
  };

  Masis.$children.forEach(($el) => {
    $el.classList.add(options.class);
    $el.addEventListener('mousedown', createGhost, false);
    $el.addEventListener('mouseup', removeGhost, false);
  });

  document.addEventListener('mousemove', moveGhost, false);
  return redefineSort();
}
