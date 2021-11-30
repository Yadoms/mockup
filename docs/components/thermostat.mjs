export function render(opts) {
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
  return `
      <div class="thermostat joliePosition">
        <p>
          ${state}
          ${current}
        </p>
        ${YadomsHelper.useComponent('dimmer', {
          value: opts.value,
          min: 0,
          max: 100,
          step: 1,
          unit: opts.unit,
          digital: opts.digital,
        })}
      </div>
    `;
}

export function style() {
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

export function init($element) {}
