class YadomsComponentNumericDisplay{constructor(){}propsKeys(){return["value","decimals","unit","capture","digital"]}render(n){parseFloat(n.value).toFixed(n.decimals);let i="";return n.capture&&n.capture.length&&(i=`<p>${n.capture}</p>`),`\n      <div class="numeric-display joliePosition">\n        ${i}\n        <div class="wrapper glass shadow-inner">\n          <div>\n            <div class="value">\n              <div>\n                ${Yadoms.makeDigital(n.value,n.digital)}\n              </div>\n            </div>\n            <div class="unit">\n              ${n.unit}\n            </div>\n          </div>\n        </div>\n      </div>\n    `}style(){return"\n      .numeric-display {\n        padding: 0.5rem;\n        flex-direction: column;\n      }\n\n      .numeric-display p {\n        text-align: center;\n        font-size: 0.75rem;\n        color: var(--shadowColor);\n      }\n\n      .numeric-display .wrapper {\n        text-align: right;\n        border-radius: 0.5rem;\n        padding-top: 0.5rem;\n        padding-right: 0.25rem;\n        width: 100%;\n        color: var(--highlightColor);\n      }\n\n      .numeric-display .wrapper > div {\n        display: flex;\n        align-items: flex-end;\n        height: 100%;\n      }\n\n      .numeric-display .wrapper > div .value {\n        flex-grow: 1;\n        height: 100%;\n      }\n\n      .numeric-display .wrapper > div .value > div {\n        position: relative;\n        overflow: hidden;\n        font-size: 1.25rem;\n        display: inline-block;\n      }\n       \n      .numeric-display .wrapper > div .unit {\n        height: 100%;\n        font-size: 0.75rm;\n      }\n    "}init(n){}update(n,i){}}export{YadomsComponentNumericDisplay as YadomsComponent};