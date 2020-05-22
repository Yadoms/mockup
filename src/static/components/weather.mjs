export function render(opts) {
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

export function style() {
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

export function init($element) {
  YadomsHelper.changeCardTitle(
    $element,
    $element.querySelector('.weather').dataset.location
  );
}
