class YadomsComponentForecast{constructor(){}propsKeys(){return["location"]}render(n){let i=[];return n.datas.forEach(n=>{i.push(`\n        <div class="forecast-day">\n          <div class="forecast-date">${n.day}</div>\n          <div class="forecast-weather">\n            <i class="fas fa-${n.cond}"></i>\n            <div class="temp-wrapper">\n              <div class="temp-min blue">\n                <span>${n.Tmin}</span>\n                <span>${n.Tunit}</span>\n              </div>\n              <div class="temp-max red">\n                <span>${n.Tmax}</span>\n                <span>${n.Tunit}</span>\n              </div>\n            </div>\n          </div>\n          <div class="forecast-conditions">\n            <div class="forecast-wind">\n              <div class="ring transform wind-${n.Wdir}">\n                <i class="fa fa-caret-up"></i>\n              </div>\n              <div class="wind-wrapper">\n                <div class="wind-min blue">${n.Wmin}</div>\n                <div class="wind-max red">${n.Wmax}</div>\n              </div>\n            </div>\n            <div class="forecast-rain" data-rain="${n.rain}">\n              <div class="liquid">\n                <div class="fill"></div>\n                <div class="word">${n.rain}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      `)}),`\n      <div class="forecast joliePosition" data-location="${n.location}">\n        <div class="wrapper">\n          ${i.join("")}\n        </div>\n      </div>\n    `}_windDirection(n,i){return`\n      .forecast .forecast-day .forecast-conditions .forecast-wind .ring.wind-${n} {\n        --transform-rotate: ${i};\n      }\n    `}style(){return`\n\n\n      .forecast .wrapper {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        justify-content: space-around;\n      }\n\n      .forecast .forecast-day {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n        height: 100%;\n        justify-content: space-around;\n        padding: 1rem 2rem;\n      }\n\n      .forecast .forecast-day .forecast-date {\n        text-align: center;\n      }\n\n      .forecast .forecast-day .forecast-weather {\n        display: flex;\n      }\n\n      .forecast .forecast-day .forecast-weather i {\n        font-size: 2.25rem;\n        text-align: center;\n        width: 2.5rem;\n        height: 2.25rem;\n        line-height: 2.25rem;\n      }\n\n      .forecast .forecast-day .forecast-weather .temp-wrapper {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        text-align: right;\n        flex-grow: 1;\n      }\n\n      .forecast .forecast-day .forecast-conditions {\n        display: flex;\n        justify-content: space-around;\n      }\n\n      .forecast .forecast-day .forecast-conditions .forecast-wind {\n        position: relative;\n        width: 4rem;\n        height: 4rem;\n      }\n\n      .forecast .forecast-day .forecast-conditions .forecast-wind .ring {\n        position: relative;\n        border-width: 2px;\n        width: 100%;\n        height: 100%;\n        border-radius: 9999px;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        display: flex;\n        justify-content: center;\n        border-color: var(--primaryColor);\n      }\n\n      .forecast .forecast-day .forecast-conditions .forecast-wind .ring > div {\n        bottom: -5px;\n        display: inline-block;\n        position: absolute;\n      }\n\n      ${this._windDirection("S","0deg")}\n      ${this._windDirection("SSE","-22.5deg")}\n      ${this._windDirection("SE","-45deg")}\n      ${this._windDirection("ESE","-67.5deg")}\n      ${this._windDirection("E","-90deg")}\n      ${this._windDirection("ENE","-112.5deg")}\n      ${this._windDirection("NE","-135deg")}\n      ${this._windDirection("NNE","-157.5deg")}\n      ${this._windDirection("N","180deg")}\n      ${this._windDirection("NNO","157.5deg")}\n      ${this._windDirection("NO","135deg")}\n      ${this._windDirection("ONO","112.5deg")}\n      ${this._windDirection("O","90deg")}\n      ${this._windDirection("OSO","67.5deg")}\n      ${this._windDirection("SO","45deg")}\n      ${this._windDirection("SSO","22.5deg")}\n\n      .forecast .forecast-day .forecast-conditions .forecast-wind .wind-wrapper {\n        position: absolute;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        text-align: center;\n        line-height: 1.25;\n        height: 100%;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n      }\n\n      .forecast .forecast-day .forecast-conditions .forecast-rain {\n        width: 0.75rem;\n        height: 4rem;\n        border-width: 2px;\n        border-radius: 9999px;\n        border-top: none; \n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        display: inline-flex ;\n        align-items: flex-end;\n        border-color: var(--primaryColor);\n      }\n      \n      .forecast .forecast-day .forecast-conditions .forecast-rain .liquid {\n        height: 0;\n        width: 0.75rem;\n        transition-property: all;\n        position: relative;\n      }\n      \n      .forecast .forecast-day .forecast-conditions .forecast-rain .liquid .fill {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        border-bottom-right-radius: 9999px;\n        border-bottom-left-radius: 9999px;\n        background-color: #3182ce;\n      }\n\n      .forecast .forecast-day .forecast-conditions .forecast-rain .liquid .word {\n        position: absolute;\n        top: 0;\n        left: 0; \n        padding-left: 1rem;\n        margin-top: -1rem;\n        color: var(--primaryColor);\n      }\n    `}init(n){Yadoms.changeCardTitle(n,n.querySelector(".forecast").dataset.location);let i=n.querySelectorAll(".forecast-rain");i.length&&i.forEach(n=>{let i=100*parseFloat(n.dataset.rain)/45;i>100&&(i=100),n.querySelector(".liquid").style.height=`${i}%`})}update(n,i,t){}getProperty(n,i){}}export{YadomsComponentForecast as YadomsComponent};