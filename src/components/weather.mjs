class YadomsComponentWeather {
  constructor() {}

  propsKeys() {
    return ['location', 'condition', 'temp', 'unit', 'digital'];
  }

  render(opts) {
    return `
      <div class="weather joliePosition" data-location="${opts.location}">
        <i class="fas fa-${opts.condition}"></i>
        <span class="value ${opts.digital ? 'font-mono' : ''}">
          ${opts.temp}
        </span>
        <span>${opts.unit}</span>
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

  update($element, name, value) {}
  getProperty($element, name) {}
}

export { YadomsComponentWeather as YadomsComponent };
