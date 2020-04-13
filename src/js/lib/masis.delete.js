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
      Yadoms.triggerEvent('masis.delete', {
        element: ev.currentTarget.parentNode,
      });
      this.Masis.$element.removeChild(ev.currentTarget.parentNode);
      MasisPosition(this.Masis.populate());
    }
  }
}
