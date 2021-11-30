export function render(opts) {
  return `
      <div class="indicator joliePosition ${opts.state ? 'active' : ''}" 
           data-icon="${opts.icon}">
        <i class="fas fa-${opts.icon}"></i>
      </div>
    `;
}

export function style() {
  return `
      .indicator {
        font-size: 2.25rem;
      }

      .indicator.active {
        color: var(--highlightColor);
      }

      .indicator i {
        text-align: center;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
      }
    `;
}

export function init($element) {}
