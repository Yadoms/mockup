class YadomsComponentName {
  constructor() {}

  propsKeys() {
    return ['value', 'unit', 'direction', 'digital'];
  }

  render(opts) {
    return `
      <div class="wind joliePosition">
        <div class="wrapper">
          <div class="ring transform wind-${opts.direction}">
            <div>
              <i class="fa fa-caret-up"></i>
            </div>
          </div>
          <div class="value">
            <span class="${opts.digital ? 'font-mono' : ''}">
              ${opts.value}
            </span>
            <span>${opts.unit}</span>
          </div>
        </div>
      </div>
    `;
  }

  _windDirection(direction, rotation) {
    return `
      .wind .wrapper .ring.wind-${direction} {
        --transform-rotate: ${rotation};
      }
    `;
  }

  style() {
    return `
      .wind .wrapper {
        position: relative;
        height: 5rem;
        width: 5rem;
      }

      .wind .wrapper .ring {
        position: relative ;
        border-width: 2px;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        border-color: var(--primaryColor);
      }
      
      .wind .wrapper .ring > div {
        display: inline-block;
        position: absolute;
        bottom: -10px;
      }

      .wind .wrapper .ring i {
        text-align: center;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
      }

      ${this._windDirection('S', '0deg')}
      ${this._windDirection('SSE', '-22.5deg')}
      ${this._windDirection('SE', '-45deg')}
      ${this._windDirection('ESE', '-67.5deg')}
      ${this._windDirection('E', '-90deg')}
      ${this._windDirection('ENE', '-112.5deg')}
      ${this._windDirection('NE', '-135deg')}
      ${this._windDirection('NNE', '-157.5deg')}
      ${this._windDirection('N', '180deg')}
      ${this._windDirection('NNO', '157.5deg')}
      ${this._windDirection('NO', '135deg')}
      ${this._windDirection('ONO', '112.5deg')}
      ${this._windDirection('O', '90deg')}
      ${this._windDirection('OSO', '67.5deg')}
      ${this._windDirection('SO', '45deg')}
      ${this._windDirection('SSO', '22.5deg')}

      .wind .wrapper .value {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: .75rem;
        text-align: center;
        line-height: 1.25;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    `;
  }

  init($element) {}

  update($element, value) {}
}

export { YadomsComponentName as YadomsComponent };
