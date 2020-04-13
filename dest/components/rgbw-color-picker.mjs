class YadomsComponentRgbwColorPicker {
  constructor() {}

  propsKeys() {
    return ['color'];
  }

  render(opts) {
    return `
      <div class="rgbw-color-picker joliePosition">
        <div class="colorpicker" data-color="${opts.color}"></div>
      </div>
    `;
  }

  style() {
    return ``;
  }

  init($element) {
    Yadoms.loader('/components/lib/iro/iro.min.js').then(() => {
      let $colorPicker = $element.querySelector('.colorpicker');
      let cp = new iro.ColorPicker($colorPicker, {
        width: 150,
        color: $colorPicker.dataset.color,
      });
      /*
      cp.on('color:change', (color, changes) => {
        console.log(color.hexString, changes)
      });
      */
    });
  }

  update($element, value) {}
}

export { YadomsComponentRgbwColorPicker as YadomsComponent };
