export function render(opts) {
  return `
      <div class="light joliePosition ${opts.state ? 'text-shadow' : ''}">
        <i class="${opts.state ? 'fas' : 'far'} fa-lightbulb"></i>
      </div>
    `;
}

export function style() {
  return `
      .light i {
        font-size: 2.25rem;
        text-align: center;
        width: 2.5rem;
        height: 2.5rem;;
        line-height: 2.5rem;;
      }
    `;
}

export function init($element) {}
