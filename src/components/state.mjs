class YadomsComponentState {
  properties = {};

  constructor() {}

  propsKeys() {
    return ['wording'];
  }

  render(opts) {
    return `
      <div class="state joliePosition">
        ${opts.wording}
      </div>
    `;
  }

  style() {
    return `
      .state {
        font-size: 1.875rem;
      }
    `;
  }

  init($element) {}

  update($element, value) {}
}

export { YadomsComponentState as YadomsComponent };
