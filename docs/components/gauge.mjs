export function render(opts) {
  return `
      <div class="gauge joliePosition" 
           data-value="${opts.value}" 
           data-min="${opts.min}" 
           data-max="${opts.max}">
        <div class="wrapper">
          <div class="ring shadow-inner">
            <div class="fill"></div>
            <div class="inner-wrapper shadow-lg">
              <div class="shadow-inner">
                <div class="container joliePosition">
                  <div class="value ${opts.digital ? 'font-mono' : ''}">
                    ${opts.value}
                  </div>
                  <div class="unit">
                    ${opts.unit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

function _generateRingColor(name, color, percent) {
  return `
      .gauge${name} .wrapper {
        box-shadow: 0 0 ${2 + percent}rem 0 ${color};
      }

      .gauge${name} .wrapper .ring .fill { background-color: ${color}; }
    `;
}

export function style() {
  return `
      ${_generateRingColor('', 'var(--activeColor)', 1)}

      .gauge .wrapper {
        width: 12rem;
        height: 12rem;
        border-radius: 9999px;
        background-color: var(--activeColor);
      }

      .gauge .wrapper .ring {
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        padding: 1rem;
        border-width: 2px;
        position: relative;
        overflow: hidden;
        border-color: #f7fafc;
      }

      .gauge .wrapper .ring .fill {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        transition-property: all;
        transition-duration: 700ms;
      }

      .gauge .wrapper .ring .inner-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        background-color: #f7fafc;
        position: relative;
        padding: 1rem;
      }

      .gauge .wrapper .ring .inner-wrapper > div {
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        text-align: center;
        position: relative;
        background-color: var(--activeColor);
      }

      .gauge .wrapper .ring .inner-wrapper > div .container {
        top: 50%;
        color: var(--primaryColor);
      }

      .gauge .wrapper .ring .inner-wrapper > div .container .value {
        font-size: 1.25rem;
      }

      .gauge .wrapper .ring .inner-wrapper > div .container .unit {
        font-size: 1.125rem;
      }

      ${_generateRingColor('.frost', '#2b6cb0', 0.2)}
      ${_generateRingColor('.cold', '#4c51bf', 0.4)}
      ${_generateRingColor('.normal', '#6b46c1', 0.6)}
      ${_generateRingColor('.warm', '#B83280', 0.8)}
      ${_generateRingColor('.hot', '#C53030', 1)}
    `;
}

export function init($element) {
  let $gauge = $element.querySelector('.gauge');
  const min = $gauge.dataset.min,
    max = $gauge.dataset.max,
    val = $gauge.dataset.value,
    $fill = $gauge.querySelector('.fill');
  let percent = (100 * (val - min)) / (max - min);
  $fill.style.height = percent + '%';
  if (percent < 20) $gauge.classList.add('frost');
  else if (percent < 40) $gauge.classList.add('cold');
  else if (percent < 60) $gauge.classList.add('normal');
  else if (percent < 80) $gauge.classList.add('warm');
  else $gauge.classList.add('hot');
}
