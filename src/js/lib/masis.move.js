import { MasisPosition, MasisSort } from 'masis';
import { triggerEvent } from '../functions';

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function MasisMove(Masis, options = {}) {
  if (options.attr == null) options.attr = 'data-sort';
  if (options.class == null) options.class = 'ghost';
  let $ghost;
  let positions;
  let oldpos = '';
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
      for (let i in positionsY)
        if (positionsY[i].localeCompare(_y) == -1) {
          let positionsX = Object.keys(positions[positionsY[i]]).reverse();
          for (let j in positionsX)
            if (positionsX[j].localeCompare(_x) == -1) {
              let newPos =
                joliNumber(
                  parseInt(
                    positions[positionsY[i]][positionsX[j]].replace('_', '')
                  ) - 1
                ) + '_';
              if (newPos != oldpos) {
                let $robot = Masis.$element.querySelector(
                  '#' + String.fromCodePoint(0x1f916)
                );
                if ($robot != null) Masis.$element.removeChild($robot);
                $robot = document.createElement('div');
                $robot.setAttribute('id', String.fromCodePoint(0x1f916));
                $robot.classList = $ghost.classList;
                $robot.classList.remove(options.class);
                $robot.innerHTML = $ghost.innerHTML;
                $robot.setAttribute(options.attr, newPos);
                Masis.$element.appendChild($robot);
                MasisPosition(MasisSort(Masis.populate(), '[data-sort]'));
                oldpos = newPos;
              }
              break;
            }
          break;
        }
    }
  };
  const createGhost = (ev) => {
    $ghost = event.target;
    Masis.$element.parentNode.appendChild($ghost);
    ev.dataTransfer.setDragImage($ghost, -99999, -99999);
    $ghost.classList.add(options.class);
    MasisPosition(Masis.populate());
    setTimeout(() => {
      generatePositionsMap();
    }, 200);
  };
  const removeGhost = (ev) => {
    $ghost.classList.remove(options.class);
    moveGhost(ev);
    let $robot = Masis.$element.querySelector(
      '#' + String.fromCodePoint(0x1f916)
    );
    $ghost.setAttribute(options.attr, $robot.getAttribute(options.attr));
    Masis.$element.removeChild($robot);
    Masis.$element.appendChild($ghost);
    MasisPosition(MasisSort(Masis.populate(), '[data-sort]'));
    oldpos = '';
    triggerEvent('masis_moved');
  };

  document.addEventListener('dragstart', createGhost, false);
  document.addEventListener('dragend', removeGhost, false);
  document.addEventListener('drag', moveGhost, false);
  return redefineSort();
}
