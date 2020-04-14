class Yadoms {
  components = {};
  pages = [];
  $style = null;

  // CMS : card management system
  masis = null;
  masisMove = null;
  masisResize = null;
  masisDelete = null;
  breakpoints = {
    width: [],
    height: [],
  };
  maxCardWidthSize = 5;
  maxCardHeightSize = 5;
  positionOptions = {
    pad: 154,
  };

  constructor() {
    console.log(
      "\
  __ __       _                \n\
 |  |  |___ _| |___ _____ ___  \n\
 |_   _| .'| . | . |     |_ -| \n\
   |_| |__,|___|___|_|_|_|___| \n\
 \n\
 Welcome to the dev world!\n\
 To have any help, type yadoms.help()\
 "
    );
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
      this.changeTheme('dark');
    else this.changeTheme('light');
    // creation of a style balise to insert all components styles
    this.$style = document.createElement('style');
    document.querySelector('head').appendChild(this.$style);
  }

  help(func = '') {
    if (func != '') {
      if ('changeTheme' == func) {
        console.log('List of available themes');
        console.table(['light', 'dark', 'lidrea']);
      }
    } else if ('' == func) {
      console.log('List of available functions');
      console.table({
        'yadoms.lightOn()': 'Change the current theme to the light mode',
        'yadoms.lightOff()': 'Change the current theme to the dark mode',
        'yadoms.changeTheme(theme)':
          'Change the current theme to a specific theme',
      });
      console.log(
        'To have more information about a function, gives the name of the function in parameter.'
      );
      console.info("Example : yadoms.help('changeTheme').");
    } else {
      console.log('no documentation for this function');
    }
  }

  lightOn() {
    return this.changeTheme('');
  }

  lightOff() {
    return this.changeTheme('dark');
  }

  changeTheme(theme) {
    if ('' == theme) theme = 'light';
    document.querySelector('link[id="theme"]').href = `/css/${theme}.min.css`;
    return 'The theme is set to ' + theme + ' now';
  }

  static ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  static triggerEvent(eventName, data = {}) {
    if (window.CustomEvent && typeof window.CustomEvent === 'function') {
      var event = new CustomEvent(eventName, { detail: data });
    } else {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, data);
    }
    document.dispatchEvent(event);
  }

  createMenu() {
    const $sidebar = document.querySelector('nav#menu ul');
    this.pages.forEach((page) => {
      let $item = document.createElement('li');
      $item.innerHTML = `
        <a
          class="text-primaryColor hover:text-highlightColor"
          href="#/${page.slug}"
        >
          <span class="icon">
            <i class="fas fa-${page.icon}"></i>
          </span>
          <span class="word md:pb-0">${page.name}</span>
        </a>
      `;
      $sidebar.appendChild($item);
    });
  }

  createNavigationSystem() {
    let $items = document.querySelectorAll('nav#menu ul li a');
    var self = this;
    $items.forEach(($el) => {
      $el.addEventListener(
        'click',
        (ev) => {
          ev.stopImmediatePropagation();
          self.viewPage(ev.currentTarget.getAttribute('href').slice(2));
        },
        false
      );
    });
  }

  createCard(
    width,
    height,
    title = '',
    content = '',
    battery = -1,
    signal = -1
  ) {
    let $div = document.createElement('div');
    let cls = ['card', 'text-primaryColor', 'bg-baseColor'];
    $div.classList.add(...cls);
    let batteryContent = '';
    let signalContent = '';
    if (battery != -1) {
      let icon = '';
      if (0 == battery) icon = 'fas fa-battery-empty red';
      else if (0.25 == battery) icon = 'fas fa-battery-quarter';
      else if (0.5 == battery) icon = 'fas fa-battery-half';
      else if (0.75 == battery) icon = 'fas fa-battery-three-quarters';
      else if (1 == battery) icon = 'fas fa-battery-full text-green-600';
      batteryContent = `<span class="icon"><i class="${icon}"></i></span>`;
    }
    if (signal != -1) {
      let cl = '';
      if (signal < 0.5) cl = 'red';
      signalContent = `<span class="icon"><i class="fas fa-wifi ${cl}"></i></span>`;
    }
    $div.innerHTML = `
      <div class="card-title clearfix card-width-${width}">
        ${batteryContent}
        ${signalContent}
        <span class="title">${title}</span>
      </div>
      <div class="card-wrapper flex-grow">
        <div class="card-width-${width} card-height-${height}">
          ${content}
        </div>
      </div>
    `;
    return $div;
  }

  static changeCardTitle($element, content) {
    let $cardtitle = $element.querySelector('.card-title');
    let $title = $cardtitle.querySelector('.title');
    $title.innerHTML = content;
    if (content == '') $cardtitle.classList.add('no-border');
    else $cardtitle.classList.remove('no-border');
  }

  createCardManagementSystem() {
    this.masis = new Masis('#cards');
    let self = this;

    for (
      let i = 1;
      i <= Math.max(this.maxCardWidthSize, this.maxCardHeightSize);
      i++
    ) {
      const $div = this.createCard(
        Math.min(i, this.maxCardWidthSize),
        Math.min(i, this.maxCardHeightSize)
      );
      document.querySelector('#cards').appendChild($div);
      const style = getComputedStyle($div);
      const rect = $div.getBoundingClientRect();
      let $iw, $ih;
      $iw =
        parseInt(rect.width) +
        parseInt(style.marginLeft) +
        parseInt(style.marginRight);
      $ih =
        parseInt(rect.height) +
        parseInt(style.marginTop) +
        parseInt(style.marginBottom);
      this.breakpoints.width.push($iw);
      this.breakpoints.height.push($ih);
      document.querySelector('#cards').removeChild($div);
    }

    this.masisMove = new MasisMove(this.masis, {
      class: '🏄',
      ghost: '👻',
      exclude: '🤖',
    });

    const resizeCard = ($el, width, height, setHeight = false) => {
      for (let i = 1; i < 6; i++) {
        $el.classList.remove(`card-width-${i}`);
        if (setHeight) $el.classList.remove(`card-height-${i}`);
      }
      $el.classList.add(`card-width-${width}`);
      if (setHeight) $el.classList.add(`card-height-${height}`);
    };

    this.masisResize = new MasisResize(this.masis, {
      class: '📐',
      active: '📜',
      selector: '.card-wrapper > div',
      breakpoints: this.breakpoints,
      callbackMove: ($card, w, h) => {
        let newW = parseInt(w) + parseInt($card.dataset.cardWidth);
        let newH = parseInt(h) + parseInt($card.dataset.cardHeight);
        if (newW < parseInt($card.dataset.cardMinWidth))
          newW = parseInt($card.dataset.cardMinWidth);
        if (newH < parseInt($card.dataset.cardMinHeight))
          newH = parseInt($card.dataset.cardMinHeight);
        if (newW > self.maxCardWidthSize) newW = self.maxCardWidthSize;
        if (newH > self.maxCardHeightSize) newW = self.maxCardHeightSize;
        resizeCard($card.querySelector('.card-title'), newW, newH);
        resizeCard(
          $card.querySelector('.card-wrapper > div'),
          newW,
          newH,
          true
        );
        $card.dataset.cardTmpWidth = newW;
        $card.dataset.cardTmpHeight = newH;
        MasisPosition(self.masis);
      },
      callbackEnd: ($card) => {
        $card.dataset.cardWidth = $card.dataset.cardTmpWidth;
        $card.dataset.cardHeight = $card.dataset.cardTmpHeight;
      },
    });

    this.masisDelete = new MasisDelete(this.masis, {
      class: '🗑️',
      message: 'Etes-vous sûr de vouloir supprimer cette tuile ?',
    });

    MasisPosition(this.masis, this.positionOptions);

    const resizeObserver = new ResizeObserver((entries) => {
      MasisPosition(this.masis, this.positionOptions);
    });

    resizeObserver.observe(document.querySelector('#cards'));

    let wrenchState = false;

    document.querySelector('#button-design').addEventListener(
      'click',
      (ev) => {
        ev.preventDefault();
        wrenchState = !wrenchState;
        ev.currentTarget.classList.remove('active');
        if (wrenchState) {
          ev.currentTarget.classList.add('active');
          self.masis.$children.forEach(($el) => {
            $el.classList.add('🏄');
          });
        } else {
          self.masis.$children.forEach(($el) => {
            $el.classList.remove('🏄');
          });
        }
      },
      false
    );
  }

  viewPage(slug) {
    for (let page of this.pages) {
      if (page.slug == slug) {
        if (page.background != '') {
          let $cover = document.querySelector('#illustration .cover');
          $cover.style.backgroundImage = `url(${page.background})`;
        }
        let $sidebar_items = document.querySelectorAll('#menu a');
        $sidebar_items.forEach((el) => {
          el.parentNode.classList.remove('active');
          if (el.getAttribute('href') == `#/${page.slug}`)
            el.parentNode.classList.add('active');
        });
        this.populate(page.cards);
        break;
      }
    }
  }

  generateCard(card) {
    let $card = this.createCard(
      card.width,
      card.height,
      card.title,
      this.components[card.type].render(card.properties),
      typeof card.battery != undefined ? card.battery : -1,
      typeof card.signal != undefined ? card.signal : -1
    );
    const cls = ['ease-in-expo'];
    $card.classList.add(...cls);
    // some datas to resize / move / ...
    $card.dataset.cardWidth = card.width;
    $card.dataset.cardMinWidth = card.minWidth;
    $card.dataset.cardHeight = card.height;
    $card.dataset.cardMinHeight = card.minHeight;
    $card.dataset.sort = MasisMove.joliNumber(card.index);
    document.querySelector('#cards').appendChild($card);
    this.components[card.type].init($card);
  }

  populate(cards) {
    document.querySelector('#cards').innerHTML = '';
    let self = this;
    let cranberries = [];
    cards.forEach((card) => {
      cranberries.push(
        new Promise((resolve) => {
          Yadoms.useComponent(card.type).then(() => {
            self.generateCard(card);
            resolve();
          });
        })
      );
    });
    Promise.all(cranberries).then(() => {
      this.masis.populate();
      MasisSort(this.masis, '[data-sort]');
      this.masisMove.init();
      this.masisResize.init();
      this.masisDelete.init();
      MasisPosition(this.masis);
    });
  }

  static makeDigital(value, hollow = true, format = '8.8.8.8.8.8.8.8.') {
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

  static _load(tag, url) {
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

  static loader(...urls) {
    const cranberries = [];
    urls.forEach((url) => {
      if (url.endsWith('.js')) cranberries.push(Yadoms._load('script', url));
      if (url.endsWith('.css')) cranberries.push(Yadoms._load('link', url));
    });
    return Promise.all(cranberries);
  }

  static useComponent(type) {
    return new Promise((resolve) => {
      if (!Object.keys(window.yadoms.components).includes(type)) {
        import(`/components/${type}.mjs`).then((Component) => {
          if (!Object.keys(window.yadoms.components).includes(type)) {
            let component = new Component.YadomsComponent();
            window.yadoms.components[type] = component;
            window.yadoms.$style.innerHTML += component.style();
          }
          resolve(window.yadoms.components[type]);
        });
      } else resolve(window.yadoms.components[type]);
    });
  }
}

window.yadoms = new Yadoms();

Yadoms.ready(() => {
  fetch('/yadoms.instance.json')
    .then((response) => response.json())
    .then((json) => {
      window.yadoms.pages = json.instance.pages;
      window.yadoms.createMenu();
      window.yadoms.createNavigationSystem();
      window.yadoms.createCardManagementSystem();
      window.yadoms.viewPage(window.location.hash.slice(2));
    });
});
