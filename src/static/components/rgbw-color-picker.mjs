export function render(opts) {
  return `
      <div class="rgbw-color-picker joliePosition">
        <div class="colorpicker" data-color="${opts.color}"></div>
      </div>
    `;
}

export function style() {
  return ``;
}

export function init($element) {
  YadomsHelper.loader('/components/lib/iro/iro.min.js').then(() => {
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
