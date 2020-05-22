export class YadomsHelper {
  public changeCardTitle($element, content) {
    let $cardtitle = $element.querySelector('.card-title');
    let $title = $cardtitle.querySelector('.title');
    $title.innerHTML = content;
    if (content == '') $cardtitle.classList.add('no-border');
    else $cardtitle.classList.remove('no-border');
  }

  public makeDigital(value, hollow = true, format = '8.8.8.8.8.8.8.8.') {
    if (hollow)
      return `
        <div class="digital">
          <span class="hollow font-mono">${format}</span>
          <span class="digits font-mono">${value}</span>
        </div>
      `;
    else
      return `
        <div class="digital">
          <span class="digits">${value}</span>
        </div>
      `;
  }
  private static _load(tag, url) {
    return new Promise((resolve, reject) => {
      let $element = document.createElement(tag);
      let parent = 'body';
      let attr = 'src';
      $element.onload = function () {
        resolve(url);
      };
      $element.onerror = function () {
        reject(url);
      };
      switch (tag) {
        case 'script':
          $element.async = true;
          break;
        case 'link':
          $element.type = 'text/css';
          $element.rel = 'stylesheet';
          attr = 'href';
          parent = 'head';
      }
      $element[attr] = url;
      if (parent == 'body') document[parent].appendChild($element);
      else document[parent].insertBefore($element, document[parent].firstChild);
    });
  }

  public loader(...urls) {
    const cranberries = [];
    urls.forEach((url) => {
      if (url.endsWith('.js'))
        cranberries.push(YadomsHelper._load('script', url));
      if (url.endsWith('.css'))
        cranberries.push(YadomsHelper._load('link', url));
    });
    return Promise.all(cranberries);
  }

  public static loadComponent(type) {
    return new Promise((resolve) => {
      if (!Object.keys(window.YadomsApp.components).includes(type)) {
        import(`./components/${type}.mjs`)
          .then((Component: any) => {
            if (!Object.keys(window.YadomsApp.components).includes(type)) {
              window.YadomsApp.components[type] = Component;
              window.YadomsApp.$style.textContent += Component.style();
            }
            resolve(window.YadomsApp.components[type]);
          })
          .catch((err) => {
            console.error(err.message);
          });
      } else resolve(window.YadomsApp.components[type]);
    });
  }

  public useComponent(type, data) {
    let uniqID = `_${type}_${Date.now()}`;
    YadomsHelper.loadComponent(type).then((Component) => {
      document.querySelector(`#${uniqID}`).innerHTML = Component.render(data);
    });
    return `<div id="${uniqID}"></div>`;
  }
}
