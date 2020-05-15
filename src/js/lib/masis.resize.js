class MasisResize {
  Masis = null;
  options = {};

  onResize = false;
  $element;
  offsetX;
  offsetY;
  previousX;
  previousY;

  constructor(Masis, options) {
    this.Masis = Masis;
    this.options = options;
    let self = this;
    document.addEventListener(
      'mousemove',
      (ev) => {
        this.resize(ev);
      },
      false
    );
    document.addEventListener(
      'mouseup',
      (ev) => {
        this.deleteResize(ev);
      },
      false
    );
  }

  init() {
    let self = this;
    this.Masis.$children.forEach(($el) => {
      let $div = document.createElement('div');
      $div.classList.add(self.options.class);
      $div.addEventListener(
        'mousedown',
        (ev) => {
          self.createResize(ev);
        },
        false
      );
      $el.appendChild($div);
    });
  }

  createResize(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (!ev.target.classList.contains(this.options.class)) return;
    this.onResize = true;
    this.$element = ev.currentTarget.parentNode;
    this.$element.classList.add(this.options.active);
    this.offsetX = 0;
    this.offsetY = 0;
    this.previousX = ev.pageX;
    this.previousY = ev.pageY;
  }

  deleteResize() {
    this.onResize = false;
    if (this.$element) {
      this.$element.classList.remove(this.options.active);
      let self = this;
      Yadoms.triggerEvent('masis.resize', {
        element: self.$element,
      });
      this.options.callbackEnd(this.$element);
    }
    this.$element = null;
  }

  resize(ev) {
    if (!this.onResize) return;
    ev.preventDefault();
    if (this.$element != null) {
      let width = this.options.breakpoints.width.length - 1;
      let height = this.options.breakpoints.height.length - 1;
      this.offsetX += ev.pageX - this.previousX;
      this.offsetY += ev.pageY - this.previousY;
      this.previousX = ev.pageX;
      this.previousY = ev.pageY;
      for (let i in this.options.breakpoints.width)
        if (this.options.breakpoints.width[i] > Math.abs(this.offsetX)) {
          width = parseInt(i);
          break;
        }
      for (let i in this.options.breakpoints.height)
        if (this.options.breakpoints.height[i] > Math.abs(this.offsetY)) {
          height = parseInt(i);
          break;
        }
      if (this.offsetX < 0) width *= -1;
      if (this.offsetY < 0) height *= -1;
      this.options.callbackMove(this.$element, width, height);
    }
  }
}

const _MasisResize = MasisResize;
export { _MasisResize as MasisResize };
