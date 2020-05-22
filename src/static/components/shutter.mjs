export function render(opts) {
  let cl = 'fas fa-door-closed';
  if ('window' == opts.type) cl = 'far fa-plus-square';
  return `
      <div class="shutter joliePosition ${opts.state ? 'active' : ''}">
        <i class="${cl}"></i>
      </div>
    `;
}

export function style() {
  return `
      .shutter.active {
        color: var(--highlightColor);
      }

      .shutter i {
        text-align: center;
        width: 2.125rem;
        height: 2.125rem;
        line-height: 2.125rem;
        display: block;
        font-size: 1.875rem;
      }
    `;
}

export function init($element) {}
