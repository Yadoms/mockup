class YadomsComponentIndicator {
  constructor() {}

  propsKeys() {
    return ['active', 'icon'];
  }

  render(opts) {
    return `
      <div class="indicator joliePosition ${opts.state ? 'active' : ''}" 
           data-icon="${opts.icon}">
        <i class="fas fa-${opts.icon}"></i>
      </div>
    `;
  }

  style() {
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

  init($element) {}

  update($element, name, value) {}
  getProperty($element, name) {}
}

export { YadomsComponentIndicator as YadomsComponent };
