class YadomsComponentThermostat {
  constructor() {}

  propsKeys() {
    return ['value', 'state', 'current', 'unit', 'digital'];
  }

  render(opts) {
    let state = '';
    if (opts.state) state = `<i class="fas fa-fire"></i>`;
    let current = '';
    if (opts.current != undefined)
      current = `
        <span class="${opts.digital ? 'font-mono' : ''}">
          ${opts.current}
        </span>
        <span>${opts.unit}</span>
      `;
    let dimmer = 'thermostat_' + Date.now();
    Yadoms.useComponent('dimmer').then((Component) => {
      document.querySelector(`#${dimmer}`).innerHTML = Component.render({
        value: opts.value,
        min: 0,
        max: 100,
        step: 1,
        unit: opts.unit,
        digital: opts.digital,
      });
    });
    return `
      <div class="thermostat joliePosition">
        <p>
          ${state}
          ${current}
        </p>
        <div id="${dimmer}"></div>
      </div>
    `;
  }

  style() {
    return `
      .thermostat {
        flex-direction: column;
      }

      .thermostat p {
        margin: 0;
      }

      .thermostat p i {
        margin-right: 0.5rem;
      }
    `;
  }

  init($element) {}

  update($element, name, value) {}
  getProperty($element, name) {}
}

export { YadomsComponentThermostat as YadomsComponent };
