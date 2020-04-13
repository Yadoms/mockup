class YadomsComponentRainGauge {
  constructor() {}

  propsKeys() {
    return [];
  }

  render(opts) {
    let ndl = 'rain_gauge_left' + Date.now();
    let ndr = 'rain_gauge_right' + Date.now();
    Yadoms.useComponent('numeric-display').then((Component) => {
      document.querySelector(`#${ndl}`).innerHTML = Component.render({
        value: opts.hour,
        decimals: 1,
        unit: 'mm',
        capture: 'depuis 1h',
        digital: opts.digital,
      });
      document.querySelector(`#${ndr}`).innerHTML = Component.render({
        value: opts.day,
        decimals: 1,
        unit: 'mm',
        capture: 'depuis 24h',
        digital: opts.digital,
      });
    });
    return `
      <div class="rain-gauge joliePosition">
        <div id="${ndl}" class="left"></div>
        <div id="${ndr}" class="right">
        </div>
      </div>
    `;
  }

  style() {
    return `
      .rain-gauge > div {
        flex-grow: 1;
      }

      .rain-gauge .left {
        margin-right: 0.5rem;
        padding-right: 0.5rem;
        display: inline-block;
        border-right-width: 1px;
        border-color: var(--primaryColor);
      }

      .rain-gauge .right {
        display: inline-block;
      }
    `;
  }

  init($element) {}

  update($element, value) {}
}

export { YadomsComponentRainGauge as YadomsComponent };
