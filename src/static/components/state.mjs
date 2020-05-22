export function render(opts) {
  return `
      <div class="state joliePosition">
        ${opts.wording}
      </div>
    `;
}

export function style() {
  return `
      .state {
        font-size: 1.875rem;
      }
    `;
}

export function init($element) {}
