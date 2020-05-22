export function render(opts) {
  let val = parseFloat(opts.value).toFixed(opts.decimals);
  let capture = '';
  if (opts.capture && opts.capture.length) capture = `<p>${opts.capture}</p>`;
  return `
      <div class="numeric-display joliePosition">
        ${capture}
        <div class="wrapper glass shadow-inner">
          <div>
            <div class="value">
              <div>
                ${YadomsHelper.makeDigital(opts.value, opts.digital)}
              </div>
            </div>
            <div class="unit">
              ${opts.unit}
            </div>
          </div>
        </div>
      </div>
    `;
}

export function style() {
  return `
      .numeric-display {
        padding: 0.5rem;
        flex-direction: column;
      }

      .numeric-display p {
        text-align: center;
        font-size: 0.75rem;
        color: var(--shadowColor);
      }

      .numeric-display .wrapper {
        text-align: right;
        border-radius: 0.5rem;
        padding-top: 0.5rem;
        padding-right: 0.25rem;
        width: 100%;
        color: var(--highlightColor);
      }

      .numeric-display .wrapper > div {
        display: flex;
        align-items: flex-end;
        height: 100%;
      }

      .numeric-display .wrapper > div .value {
        flex-grow: 1;
        height: 100%;
      }

      .numeric-display .wrapper > div .value > div {
        position: relative;
        overflow: hidden;
        font-size: 1.25rem;
        display: inline-block;
      }
       
      .numeric-display .wrapper > div .unit {
        height: 100%;
        font-size: 0.75rm;
      }
    `;
}

export function init($element) {}
