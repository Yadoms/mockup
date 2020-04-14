class YadomsComponentWeather{constructor(){}propsKeys(){return["location","condition","temp","unit","digital"]}render(n){return`\n      <div class="weather joliePosition" data-location="${n.location}">\n        <i class="fas fa-${n.condition}"></i>\n        <span class="value ${n.digital?"font-mono":""}">\n          ${n.temp}\n        </span>\n        <span>${n.unit}</span>\n      </div>\n    `}style(){return"\n      .weather i {\n        font-size: 2.25rem;\n        text-align: center;\n        width: 2.5rem;\n        height: 2.25rem;\n        line-height: 2.25rem;\n      }\n\n      .weather .value {\n        padding-left: 0.5rem;\n      }\n    "}init(n){Yadoms.changeCardTitle(n,n.querySelector(".weather").dataset.location)}update(n,e){}}export{YadomsComponentWeather as YadomsComponent};