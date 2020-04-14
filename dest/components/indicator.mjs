class YadomsComponentIndicator{constructor(){}propsKeys(){return["active","icon"]}render(n){return`\n      <div class="indicator joliePosition ${n.state?"active":""}" \n           data-icon="${n.icon}">\n        <i class="fas fa-${n.icon}"></i>\n      </div>\n    `}style(){return"\n      .indicator {\n        font-size: 2.25rem;\n      }\n\n      .indicator.active {\n        color: var(--highlightColor);\n      }\n\n      .indicator i {\n        text-align: center;\n        width: 2.5rem;\n        height: 2.5rem;\n        line-height: 2.5rem;\n      }\n    "}init(n){}update(n,i){}}export{YadomsComponentIndicator as YadomsComponent};