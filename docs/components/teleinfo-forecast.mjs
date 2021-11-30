export function render(opts) {
  return `
      <div class="teleinfo-forecast joliePosition">
        <div class="square ${opts.color}"></div>
      </div>
    `;
}

export function style() {
  return `
      .teleinfo-forecast .square {
        border-radius: 9999px;
        border-width: 2px;
        width: 3rem;
        height: 3rem;
        box-shadow: 0 0 20px currentColor;
      }

      .teleinfo-forecast .square.blue {
        background-color: #3182CE;
        color: #3182CE;
        border-color: #2C5282;
      }

      .teleinfo-forecast .square.white {
        background-color: #FFFFFF;
        color: #FFFFFF;
        border-color: #E2E8F0;
      }

      .teleinfo-forecast .square.red {
        background-color: #E53E3E;
        color: #E53E3E;
        border-color: #9B2C2C;
      }
    `;
}

export function init($element) {}
