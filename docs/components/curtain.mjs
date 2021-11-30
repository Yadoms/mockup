export function render(opts) {
  return `
      <div class="curtain joliePosition">
        <button class="up shadow-inner" data-action="up">
          <i class="fas fa-caret-up"></i>
        </button>
        <button class="stop shadow-inner" data-action="stop">
          <i class="fas fa-stop"></i>
        </button>
        <button class="down shadow-inner" data-action="down">
          <i class="fas fa-caret-down"></i>
        </button>
      </div>
    `;
}

export function style() {
  return `
      .curtain {
        font-weight: bold;
        font-size: 1.25rem;
        flex-direction: column;
      }

      .curtain button {
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--activeColor);
        color: var(--highlighColor);
      }

      .curtain button:hover {
        background-color: var(--highlightColor);
        color: var(--activeColor);
      }

      .curtain button.up {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        border-bottom-width: 1px;
        border-color: var(--frontColor);
      }

      .curtain button.stop {
        border-bottom-width: 1px;
        border-color: var(--frontColor);
      }

      .curtain button.down {
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    `;
}

export function init($element) {}
