class YadomsComponentRainGauge {
  constructor() {}

  propsKeys() {
    return [];
  }

  render(opts) {
    return `
      <div class="rain-gauge joliePosition">
        <div class="left">
          ${Yadoms.useComponent('numeric-display', {
            value: opts.hour,
            decimals: 1,
            unit: 'mm',
            capture: 'depuis 1h',
            digital: opts.digital,
          })}
        </div>
        <div class="right">
          ${Yadoms.useComponent('numeric-display', {
            value: opts.day,
            decimals: 1,
            unit: 'mm',
            capture: 'depuis 24h',
            digital: opts.digital,
          })}
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

  update($element, name, value) {}
  getProperty($element, name) {}
}

export { YadomsComponentRainGauge as YadomsComponent };
