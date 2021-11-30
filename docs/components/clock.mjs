export function style() {
  return `
      .clock {
        font-size: 1.875rem;
      }

      .clock .wrapper {
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4rem;
        padding: 0 0.5rem;
        color: var(--highlightColor);
      }

      .clock .wrapper .ampm {
        font-size: 1.25rem;
        padding-left: 0.5rem;
      }
    `;
}

export function render(opts) {
  return `
      <div class="clock joliePosition" data-seconds="${
        opts.seconds ? opts.seconds : 'false'
      }">
        <div class="wrapper glass shadow-inner">
          ${YadomsHelper.makeDigital('', opts.digital, '88:88:88')}
          <div class="ampm"></div>
        </div>
      </div>
    `;
}

function _joliNumber(num) {
  if (num < 10) return '0' + num;
  return num;
}

function _tick($element) {
  let date = new Date();
  YadomsHelper.changeCardTitle(
    $element,
    date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );
  let hour = date.getHours();
  let apm = 'AM';
  if (hour > 12) {
    hour -= 12;
    apm = 'PM';
  }
  $element.querySelector('.digits').innerHTML =
    _joliNumber(hour) + ':' + _joliNumber(date.getMinutes());
  if ($element.querySelector('.clock').dataset.seconds == 'true')
    $element.querySelector('.digits').innerHTML +=
      ':' + _joliNumber(date.getSeconds());
  $element.querySelector('.ampm').innerHTML = apm;
}

export function init($element) {
  setInterval(() => {
    _tick($element);
  }, 1000);
  _tick($element);
}
