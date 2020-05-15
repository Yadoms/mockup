class YadomsComponentClock {
  constructor() {}

  propsKeys() {
    return ['seconds', 'digital'];
  }

  render(opts) {
    return `
      <div class="clock joliePosition" data-seconds="${
        opts.seconds ? opts.seconds : 'false'
      }">
        <div class="wrapper glass shadow-inner">
          ${Yadoms.makeDigital('', opts.digital, '88:88:88')}
          <div class="ampm"></div>
        </div>
      </div>
    `;
  }

  style() {
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

  _joliNumber(num) {
    if (num < 10) return '0' + num;
    return num;
  }

  _tick($element) {
    let self = this;
    let date = new Date();
    Yadoms.changeCardTitle(
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
      self._joliNumber(hour) + ':' + self._joliNumber(date.getMinutes());
    if ($element.querySelector('.clock').dataset.seconds == 'true')
      $element.querySelector('.digits').innerHTML +=
        ':' + self._joliNumber(date.getSeconds());
    $element.querySelector('.ampm').innerHTML = apm;
  }

  init($element) {
    let self = this;
    setInterval(() => {
      self._tick($element);
    }, 1000);
    this._tick($element);
  }

  update($element, name, value) {}
  getProperty($element, name) {}
}

export { YadomsComponentClock as YadomsComponent };
