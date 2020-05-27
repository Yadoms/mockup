export function render(opts) {
  let html = '';
  if ('button' == opts.type) {
    html = `
        <button class="switch-button neumorphism ${opts.state ? 'active' : ''}">
          <i class="fas fa-${opts.icon}"></i>
          <span class="sr-only">${opts.cardTitle}</span>
        </button>
      `;
  } else if ('arrow' == opts.type) {
    html = `
        <div class="switch-arrow joliePosition">
          <button class="up shadow-inner" data-action="up">
            <i class="fas fa-caret-up"></i>
            <span class="sr-only">Up</span>
          </button>
          <button class="down shadow-inner" data-action="down">
            <i class="fas fa-caret-down"></i>
            <span class="sr-only">Down</span>
          </button>
        </div>
      `;
  } else if ('toggle' == opts.type) {
    html = `
        <div class="switch-toggle">
          <div>
            <label for="-=[ID]=-" class="sr-only">${opts.cardTitle}</label>
            <input id="-=[ID]=-" type="checkbox" ${
              opts.state == true ? 'checked' : ''
            } />
            <div class="wrapper shadow-inner">
              <div class="round shadow transform"></div>
            </div>
          </div>
        </div>
      `;
  }
  return `
      <div class="switch joliePosition">
        ${html}
      </div>
    `;
}

export function style() {
  return `
      .switch-arrow {
        flex-direction: column;
      }

      .switch-arrow button {
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--activeColor);
        color: var(--highlighColor);
      }

      .switch-arrow button:hover {
        background-color: var(--highlightColor);
        color: var(--activeColor);
      }

      .switch-arrow button.up {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        border-bottom-width: 1px;
        border-color: var(--frontColor);
      }

      .switch-arrow button.down {
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }

      .switch-button {
        font-size: 1.875rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        border-width: 1px;
        color: var(--primaryColor);
        background-color: var(--baseColor);
        line-height: normal;
        cursor: pointer;
      }

      .switch-button.active {
        color: var(--highlightColor);
      }

      .switch-button i {
        text-align: center;
        width: 2.125rem;
        height: 2.125rem;
        line-height: 2.125rem;
        display: block;
      }

      .switch-toggle {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        margin: 1rem 0;
      }

      .switch-toggle > div {
        position: relative;
      }

      .switch-toggle > div input {
        position: absolute;
        opacity: 0;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
      }

      .switch-toggle > div input[checked] ~ .wrapper {
        background-color: var(--highlightColor);
        box-shadow: 0 0 10px 0 var(--highlightColor);
      }

      .switch-toggle > div input[checked] ~ .wrapper .round {
        --transform-translate-x: 100%;
      }
      
      .switch-toggle > div .wrapper {
        background-color: var(--activeColor);
        border-radius: 9999px;
        width: 2.5rem;
        height: 1.5rem;
      }

      .switch-toggle > div .round {
        position: absolute;
        width: 1rem;
        height: 1rem;
        margin: 0.25rem;
        border-radius: 9999px;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: var(--frontColor);
        transition-property: transform;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .switch-toggle:hover > div .wrapper {
        background-color: var(--primaryColor) !important;
        box-shadow: none;
      }
    `;
}

export function init($element) {
  if ($element.querySelectorAll('.switch-toggle').length) {
    $element.querySelector('.switch-toggle').addEventListener(
      'click',
      (ev) => {
        ev.stopPropagation();
        let $input = ev.currentTarget.querySelector('input');
        if ($input.hasAttribute('checked')) {
          $input.removeAttribute('checked');
        } else {
          $input.setAttribute('checked', 'checked');
        }
      },
      false
    );
  }
  if ($element.querySelectorAll('.switch-button').length) {
    $element.querySelector('.switch-button').addEventListener(
      'click',
      (ev) => {
        ev.preventDefault();
        let $el = ev.currentTarget;
        if ($el.classList.contains('active')) $el.classList.remove('active');
        else $el.classList.add('active');
        ev.stopPropagation();
      },
      false
    );
  }
}
