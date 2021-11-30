export function render(opts) {
  return `
      <div class="dimmer joliePosition">
        <div class="wrapper shadow-inner">
          <button class="shadow-inner" data-action="decrement">
            <i class="fas fa-minus"></i>
          </button>
          <div class="inner-wrapper shadow-inner">
            <input class="${opts.digital ? 'font-mono' : ''}" 
                   type="number" 
                   value="${opts.value}" 
                   min="${opts.min}" 
                   max="${opts.max}" 
                   step="${opts.step}" />
            <div class="suffix">
              <div>${opts.unit}</div>
            </div>
          </div>
          <button class="shadow-inner" data-action="increment">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    `;
}

export function style() {
  return `
      .dimmer {
        padding: 0 2rem;
      }

      .dimmer .wrapper {
        width: 100%;
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
        overflow: hidden ;
        color: var(--highlightColor);
        background-color: var(--activeColor);
      }

      .dimmer .wrapper button {
        padding: 0.5rem;
        height: 100%;
        width: 2.5rem;
        font-weight: bold;
        font-size: 1.125rem;
        background-color: var(--activeColor);
        color: var(--highlightColor);
      }

      .dimmer .wrapper button:hover {
        background-color: var(--highlightColor);
        color: var(--activeColor);
      }

      .dimmer .wrapper .inner-wrapper {
        position: relative;
        height: 100%;
        padding: 0.5rem 1rem;
        flex-grow: 1;
        font-weight: bold;
      }

      .dimmer .wrapper .inner-wrapper input {
        text-align: right;
        height: 100%;
        width: 100%;
        padding-right: 1rem;
        background-color: var(--activeColor);
        color: var(--highlightColor);
        font-size: 1.125rem;
      }

      .dimmer .wrapper .inner-wrapper .suffix {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        flex-direction: column;
        display: flex;
        align-items: center;
      }

      .dimmer .wrapper .inner-wrapper .suffix div {
        font-size: 0.75rem;
        padding-right: 0.5rem;
      }

    `;
}

function _decrement(ev) {
  const $element = ev.currentTarget.parentNode,
    $input = $element.querySelector('input'),
    step = Number($input.getAttribute('step')),
    min = Number($input.getAttribute('min'));
  let value = Number($input.value),
    val = value - step;
  if (val < min) val = value;
  $input.value = val;
}

function _increment(ev) {
  const $element = ev.currentTarget.parentNode,
    $input = $element.querySelector('input'),
    step = Number($input.getAttribute('step')),
    max = Number($input.getAttribute('max'));
  let value = Number($input.value),
    val = value + step;
  if (val > max) val = value;
  $input.value = val;
}

export function init($element) {
  $element
    .querySelector('.dimmer button[data-action="increment"]')
    .addEventListener('click', _increment, false);
  $element
    .querySelector('.dimmer button[data-action="decrement"]')
    .addEventListener('click', _decrement, false);
}
