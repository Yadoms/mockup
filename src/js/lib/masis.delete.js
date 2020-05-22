import { MasisPosition } from 'masis';

class MasisDelete {
  Masis = null;
  options = {};

  constructor(Masis, options) {
    this.Masis = Masis;
    this.options = options;
  }

  init() {
    let self = this;
    this.Masis.$children.forEach(($el) => {
      let $div = document.createElement('div');
      $div.classList.add(self.options.class);
      $div.addEventListener(
        'mousedown',
        (ev) => {
          self.removeChild(ev);
        },
        false
      );
      $el.appendChild($div);
    });
  }

  removeChild(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (confirm(this.options.message)) {
      let event = new CustomEvent('masis.delete', {
        detail: {
          element: ev.currentTarget.parentNode,
        },
      });
      document.dispatchEvent(event);
      this.Masis.$element.removeChild(ev.currentTarget.parentNode);
      MasisPosition(this.Masis.populate());
    }
  }
}

const _MasisDelete = MasisDelete;
export { _MasisDelete as MasisDelete };
