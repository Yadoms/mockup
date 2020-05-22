import { MasisPosition, MasisSort } from 'masis';

class MasisMove {
  Masis = null;
  options = {};
  $ghost;
  positions;
  oldpos = '';
  onDrag = false;

  constructor(Masis, options = {}) {
    this.Masis = Masis;
    if (options.attr == null) options.attr = 'data-sort';
    if (options.ghost == null) options.ghost = 'ghost';
    this.options = options;

    let self = this;

    document.addEventListener(
      'mousemove',
      (ev) => {
        self.moveGhost(ev);
      },
      false
    );
    this.redefineSort();
  }

  init() {
    let self = this;
    this.Masis.$children.forEach(($el) => {
      $el.addEventListener(
        'mousedown',
        (ev) => {
          self.createGhost(ev);
        },
        false
      );
      $el.addEventListener(
        'mouseup',
        (ev) => {
          self.removeGhost(ev);
        },
        false
      );
    });
  }

  static pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  static joliNumber(num) {
    return `_${MasisMove.pad(num, 6, '0')}`;
  }

  redefineSort() {
    let self = this;
    this.Masis.$children.forEach(($el, i) => {
      $el.setAttribute(this.options.attr, MasisMove.joliNumber(i + 1));
    });
  }

  generatePositionsMap() {
    this.positions = {};
    let self = this;
    this.Masis.$children.forEach(($el) => {
      let et = MasisMove.joliNumber($el.style.top.replace('px', ''));
      let el = MasisMove.joliNumber($el.style.left.replace('px', ''));
      if (typeof self.positions[et] == 'undefined') self.positions[et] = {};
      self.positions[et][el] = $el.getAttribute(self.options.attr);
    });
  }

  createFake(newPos) {
    let $robot = this.Masis.$element.querySelector('#' + this.options.exclude);
    if ($robot != null) this.Masis.$element.removeChild($robot);
    $robot = document.createElement('div');
    $robot.setAttribute('id', this.options.exclude);
    $robot.classList = this.$ghost.classList;
    $robot.classList.remove(this.options.ghost);
    $robot.innerHTML = this.$ghost.innerHTML;
    $robot.setAttribute(this.options.attr, newPos);
    this.Masis.$element.appendChild($robot);
  }

  moveGhost(ev) {
    if (!this.onDrag) return;
    ev.preventDefault();
    let newX = ev.pageX;
    let newY = ev.pageY;
    newX -= 90;
    newY -= 50;
    this.$ghost.style.left = newX + 'px';
    this.$ghost.style.top = newY + 'px';
    let _x = MasisMove.joliNumber(newX);
    let _y = MasisMove.joliNumber(newY);
    if (this.positions != null) {
      let positionsY = Object.keys(this.positions).reverse();
      let newPos = MasisMove.joliNumber(0);
      for (let i in positionsY)
        if (positionsY[i].localeCompare(_y) == -1) {
          let positionsX = Object.keys(this.positions[positionsY[i]]).reverse();
          for (let j in positionsX)
            if (positionsX[j].localeCompare(_x) == -1) {
              newPos =
                MasisMove.joliNumber(
                  parseInt(
                    this.positions[positionsY[i]][positionsX[j]].replace(
                      '_',
                      ''
                    )
                  )
                ) + '_';
              break;
            }
          break;
        }
      if (newPos != this.oldpos) {
        this.createFake(newPos);
        MasisPosition(MasisSort(this.Masis.populate(), '[data-sort]'));
        this.oldpos = newPos;
      }
    }
  }

  createGhost(ev) {
    if (ev.currentTarget.classList.contains(this.options.exclude)) return;
    if (!ev.currentTarget.classList.contains(this.options.class)) return;
    this.onDrag = true;
    this.$ghost = event.currentTarget;
    this.Masis.$element.parentNode.appendChild(this.$ghost);
    this.$ghost.classList.add(this.options.ghost);
    this.createFake(this.$ghost.getAttribute(this.options.attr));
    MasisPosition(MasisSort(this.Masis.populate(), '[data-sort]'));
    this.generatePositionsMap();
  }

  removeGhost(ev) {
    if (this.$ghost != null) {
      this.$ghost.classList.remove(this.options.ghost);
      this.moveGhost(ev);
      let $robot = this.Masis.$element.querySelector(
        '#' + this.options.exclude
      );
      this.$ghost.setAttribute(
        this.options.attr,
        $robot.getAttribute(this.options.attr)
      );
      this.Masis.$element.removeChild($robot);
      this.Masis.$element.appendChild(this.$ghost);
      MasisPosition(MasisSort(this.Masis.populate(), '[data-sort]'));
      this.redefineSort();
      this.oldpos = '';
      this.onDrag = false;
      let event = new CustomEvent('masis.moved', {
        detail: {},
      });
      document.dispatchEvent(event);
    }
  }
}

const _MasisMove = MasisMove;
export { _MasisMove as MasisMove };
