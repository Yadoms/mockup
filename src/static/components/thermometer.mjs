export function render(opts) {
  let cl = opts.digital ? 'font-mono' : '';
  return `
      <div class="thermometer" 
          data-value="${opts.value}"
          data-min="${opts.min}"
          data-max="${opts.max}">
        <div class="tube">
          <div class="liquid bar">
            <div class="text-primaryColor">
              <span class="value ${cl}">${opts.value}</span>
              <span>${opts.unit}</span>
            </div>
          </div>
        </div>
        <div class="bulb">
          <div class="liquid"></div>
        </div>
      </div>
    `;
}

function _generateTubeColor(temp, hexColor) {
  return `
      .thermometer${temp} .liquid {
        background-color: ${hexColor};
      }

      .thermometer${temp} .bulb {
        box-shadow: 0 0 20px 0 ${hexColor};
      }
    `;
}

export function style() {
  return `
      .thermometer {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-left: -1.5rem;
        padding-top: 0.5rem;
      }

      .thermometer .tube {
        border-top-left-radius: 9999px;
        border-top-right-radius: 9999px;
        border-width: 2px;
        border-bottom-width: 0;
        border-color: #718096;
        background-color: #fff;
        width: 1.25rem;
        height: 100%;
        z-index: 10;
        margin-bottom: -0.25rem;
        display: inline-flex;
        align-items: flex-end;
        margin-left: -1.5rem;
      }

      .thermometer .tube .liquid {
        border-top-left-radius: 9999px;
        border-top-right-radius: 9999px;
        height: 0;
        width: 1.25rem;
        margin: 0.25rem 0.25rem -0.25rem;
        transition-property: all;
        transition-duration: 700ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        font-size: .75rem;
      }

      .thermometer .tube .liquid > div {
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 2rem;
        margin-top: -0.5rem;
        display: flex;
      }

      .thermometer .bulb {
        border-radius: 9999px;
        width: 2rem;
        height: 2rem;
        border-width: 2px;
        border-color: #718096;
        background-color: #fff;
        display: inline-flex;
        margin-left: -1.5rem;
      }

      .thermometer .bulb .liquid {
        border-radius: 9999px;
        width: 1.5rem;
        height: 1.25rem;
        margin: 0.25rem;
        transition-property: background-color, border-color, color, fill, stroke;
        transition-duration: 700ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ${_generateTubeColor('', '#4a5568')}
      ${_generateTubeColor('.frost', '#2b6cb0')}
      ${_generateTubeColor('.cold', '#4c51bf')}
      ${_generateTubeColor('.normal', '#6b46c1')}
      ${_generateTubeColor('.warm', '#b83280')}
      ${_generateTubeColor('.hot', '#c53030')}
    `;
}

function _fever($thermometer) {
  $thermometer = $thermometer.querySelector('.thermometer');
  const min = $thermometer.dataset.min,
    max = $thermometer.dataset.max,
    val = $thermometer.dataset.value;
  let percent = (100 * (val - min)) / (max - min),
    $bar = $thermometer.querySelector('.bar');
  $bar.style.height = percent + '%';
  if (percent < 20) $thermometer.classList.add('frost');
  else if (percent < 40) $thermometer.classList.add('cold');
  else if (percent < 60) $thermometer.classList.add('normal');
  else if (percent < 80) $thermometer.classList.add('warm');
  else $thermometer.classList.add('hot');
}

export function init($thermometer) {
  _fever($thermometer);
}

export function update($thermometer, name, value) {
  $thermometer.dataset[name] = parseFloat(value);
  $thermometer.querySelector('span.value').innerText(value);
  _fever($thermometer);
}
