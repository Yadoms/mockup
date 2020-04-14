class YadomsComponentRgbColorPicker {
  constructor() {}

  propsKeys() {
    return ['color'];
  }

  render(opts) {
    return `
      <div class="rgb-color-picker joliePosition">
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
        wheelLightness: false,
        layout: [
          {
            component: iro.ui.Wheel,
            options: {},
          },
        ],
      });
      /*
      cp.on('color:change', (color, changes) => {
        console.log(color.hexString, changes)
      });
      */
    });
  }

  update($element, name, value) {}
  getProperty($element, name) {}
}

export { YadomsComponentRgbColorPicker as YadomsComponent };
