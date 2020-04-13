class YadomsComponentWeather {
  constructor() {}

  propsKeys() {
    return ['location', 'condition', 'temp', 'unit', 'digital'];
  }

  render(opts) {
    return `
      <div class="weather" data-location="${opts.location}">
        <div class="joliePosition">
          <i class="fas fa-${opts.condition}"></i>
          <span class="value ${opts.digital ? 'font-mono' : ''}">
            ${opts.temp}
          </span>
          <span>${opts.unit}</span>
        </div>
      </div>
    `;
  }

  style() {
    return `
      .weather i {
        font-size: 2.25rem;
        text-align: center;
        width: 2.5rem;
        height: 2.25rem;
        line-height: 2.25rem;
      }

      .weather .value {
        padding-left: 0.5rem;
      }
    `;
  }

  init($element) {
    Yadoms.changeCardTitle(
      $element,
      $element.querySelector('.weather').dataset.location
    );
  }

  update($element, value) {}
}

export { YadomsComponentWeather as YadomsComponent };
