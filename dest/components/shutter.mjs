class YadomsComponentShutter{constructor(){}propsKeys(){return["type","state"]}render(t){let e="fas fa-door-closed";return"window"==t.type&&(e="far fa-plus-square"),`\n      <div class="shutter joliePosition ${t.state?"active":""}">\n        <i class="${e}"></i>\n      </div>\n    `}style(){return"\n      .shutter.active {\n        color: var(--highlightColor);\n      }\n\n      .shutter i {\n        text-align: center;\n        width: 2.125rem;\n        height: 2.125rem;\n        line-height: 2.125rem;\n        display: block;\n        font-size: 1.875rem;\n      }\n    "}init(t){}update(t,e){}}export{YadomsComponentShutter as YadomsComponent};