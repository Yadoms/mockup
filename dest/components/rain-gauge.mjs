class YadomsComponentRainGauge{constructor(){}propsKeys(){return[]}render(n){let e="rain_gauge_left"+Date.now(),i="rain_gauge_right"+Date.now();return Yadoms.useComponent("numeric-display").then(r=>{document.querySelector(`#${e}`).innerHTML=r.render({value:n.hour,decimals:1,unit:"mm",capture:"depuis 1h",digital:n.digital}),document.querySelector(`#${i}`).innerHTML=r.render({value:n.day,decimals:1,unit:"mm",capture:"depuis 24h",digital:n.digital})}),`\n      <div class="rain-gauge joliePosition">\n        <div id="${e}" class="left"></div>\n        <div id="${i}" class="right">\n        </div>\n      </div>\n    `}style(){return"\n      .rain-gauge > div {\n        flex-grow: 1;\n      }\n\n      .rain-gauge .left {\n        margin-right: 0.5rem;\n        padding-right: 0.5rem;\n        display: inline-block;\n        border-right-width: 1px;\n        border-color: var(--primaryColor);\n      }\n\n      .rain-gauge .right {\n        display: inline-block;\n      }\n    "}init(n){}update(n,e){}}export{YadomsComponentRainGauge as YadomsComponent};