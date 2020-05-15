class YadomsComponent {
  style(): string {
    return '';
  }
  render(data): string {
    return '';
  }
}

export class YadomsLoader {
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

  public static loader(...urls) {
    const cranberries = [];
    urls.forEach((url) => {
      if (url.endsWith('.js'))
        cranberries.push(YadomsLoader._load('script', url));
      if (url.endsWith('.css'))
        cranberries.push(YadomsLoader._load('link', url));
    });
    return Promise.all(cranberries);
  }

  public static loadComponent(type) {
    return new Promise((resolve) => {
      if (!Object.keys(window.YadomsApp.components).includes(type)) {
        import(`/components/${type}.mjs`)
          .then((Component: YadomsComponent) => {
            console.log(Component);
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

  public static useComponent(type, data) {
    let uniqID = `_${type}_${Date.now()}`;
    YadomsLoader.loadComponent(type).then((Component: YadomsComponent) => {
      document.querySelector(`#${uniqID}`).innerHTML = Component.render(data);
    });
    return `<div id="${uniqID}"></div>`;
  }
}
