export function render(opts) {
  let days = [];
  opts.datas.forEach((day) => {
    days.push(`
        <div class="forecast-day">
          <div class="forecast-date">${day.day}</div>
          <div class="forecast-weather">
            <i class="fas fa-${day.cond}"></i>
            <div class="temp-wrapper">
              <div class="temp-min blue">
                <span>${day.Tmin}</span>
                <span>${day.Tunit}</span>
              </div>
              <div class="temp-max red">
                <span>${day.Tmax}</span>
                <span>${day.Tunit}</span>
              </div>
            </div>
          </div>
          <div class="forecast-conditions">
            <div class="forecast-wind">
              <div class="ring transform wind-${day.Wdir}">
                <i class="fa fa-caret-up"></i>
              </div>
              <div class="wind-wrapper">
                <div class="wind-min blue">${day.Wmin}</div>
                <div class="wind-max red">${day.Wmax}</div>
              </div>
            </div>
            <div class="forecast-rain" data-rain="${day.rain}">
              <div class="liquid">
                <div class="fill"></div>
                <div class="word">${day.rain}</div>
              </div>
            </div>
          </div>
        </div>
      `);
  });
  return `
      <div class="forecast joliePosition" data-location="${opts.location}">
        <div class="wrapper">
          ${days.join('')}
        </div>
      </div>
    `;
}

function _windDirection(direction, rotation) {
  return `
      .forecast .forecast-day .forecast-conditions .forecast-wind .ring.wind-${direction} {
        --transform-rotate: ${rotation};
      }
    `;
}

export function style() {
  return `
      .forecast .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-around;
      }

      .forecast .forecast-day {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        padding: 1rem 2rem;
      }

      .forecast .forecast-day .forecast-date {
        text-align: center;
      }

      .forecast .forecast-day .forecast-weather {
        display: flex;
      }

      .forecast .forecast-day .forecast-weather i {
        font-size: 2.25rem;
        text-align: center;
        width: 2.5rem;
        height: 2.25rem;
        line-height: 2.25rem;
      }

      .forecast .forecast-day .forecast-weather .temp-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: right;
        flex-grow: 1;
      }

      .forecast .forecast-day .forecast-conditions {
        display: flex;
        justify-content: space-around;
      }

      .forecast .forecast-day .forecast-conditions .forecast-wind {
        position: relative;
        width: 4rem;
        height: 4rem;
      }

      .forecast .forecast-day .forecast-conditions .forecast-wind .ring {
        position: relative;
        border-width: 2px;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        border-color: var(--primaryColor);
      }

      .forecast .forecast-day .forecast-conditions .forecast-wind .ring > i {
        bottom: -5px;
        display: inline-block;
        position: absolute;
      }

      ${_windDirection('S', '0deg')}
      ${_windDirection('SSE', '-22.5deg')}
      ${_windDirection('SE', '-45deg')}
      ${_windDirection('ESE', '-67.5deg')}
      ${_windDirection('E', '-90deg')}
      ${_windDirection('ENE', '-112.5deg')}
      ${_windDirection('NE', '-135deg')}
      ${_windDirection('NNE', '-157.5deg')}
      ${_windDirection('N', '180deg')}
      ${_windDirection('NNO', '157.5deg')}
      ${_windDirection('NO', '135deg')}
      ${_windDirection('ONO', '112.5deg')}
      ${_windDirection('O', '90deg')}
      ${_windDirection('OSO', '67.5deg')}
      ${_windDirection('SO', '45deg')}
      ${_windDirection('SSO', '22.5deg')}

      .forecast .forecast-day .forecast-conditions .forecast-wind .wind-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        line-height: 1.25;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }

      .forecast .forecast-day .forecast-conditions .forecast-rain {
        width: 0.75rem;
        height: 4rem;
        border-width: 2px;
        border-radius: 9999px;
        border-top: none; 
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        display: inline-flex ;
        align-items: flex-end;
        border-color: var(--primaryColor);
      }
      
      .forecast .forecast-day .forecast-conditions .forecast-rain .liquid {
        height: 0;
        width: 0.75rem;
        transition-property: all;
        position: relative;
      }
      
      .forecast .forecast-day .forecast-conditions .forecast-rain .liquid .fill {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-bottom-right-radius: 9999px;
        border-bottom-left-radius: 9999px;
        background-color: #3182ce;
      }

      .forecast .forecast-day .forecast-conditions .forecast-rain .liquid .word {
        position: absolute;
        top: 0;
        left: 0; 
        padding-left: 1rem;
        margin-top: -1rem;
        color: var(--primaryColor);
      }
    `;
}

export function init($element) {
  YadomsHelper.changeCardTitle(
    $element,
    $element.querySelector('.forecast').dataset.location
  );
  let $rains = $element.querySelectorAll('.forecast-rain');
  if ($rains.length)
    $rains.forEach(($rain) => {
      let percent = (100 * parseFloat($rain.dataset.rain)) / 45;
      if (percent > 100) percent = 100;
      $rain.querySelector('.liquid').style.height = `${percent}%`;
    });
}
