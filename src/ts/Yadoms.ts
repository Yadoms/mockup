import { Masis, MasisPosition, MasisSort } from 'masis';
import { MasisDelete } from '../js/lib/masis.delete.js';
import { MasisMove } from '../js/lib/masis.move.js';
import { MasisResize } from '../js/lib/masis.resize.js';
import { themes } from './YadomsThemes';
import { YadomsHelper } from './YadomsHelper';
import { ResizeObserver } from 'resize-observer';
import * as Blockly from 'blockly';

declare global {
  interface Window {
    YadomsApp: Yadoms;
  }
}

export class Yadoms {
  public $style = null;
  public components = {};
  public pages = [];

  // CMS : card management system
  private _masis = null;
  private _masisMove = null;
  private _masisResize = null;
  private _masisDelete = null;
  private _breakpoints = {
    width: [],
    height: []
  };
  private _maxCardWidthSize: number = 5;
  private _maxCardHeightSize: number = 5;
  private _positionOptions = {
    pad: 154
  };

  public constructor() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
      Yadoms.changeTheme('dark');
    else Yadoms.changeTheme('light');
    // creation of a style balise to insert all components styles
    this.$style = document.createElement('style');
    document.querySelector('head').appendChild(this.$style);

    let configState = false;
    document.querySelector('#button-config').addEventListener(
      'click',
      ev => {
        ev.preventDefault();
        configState = !configState;
        let $e = ev.currentTarget as HTMLElement;
        $e.classList.remove('active');
        if (configState) {
          $e.classList.add('active');
        }
      },
      false
    );
  }

  public static changeTheme(theme: string) {
    if ('' == theme) theme = 'light';
    themes.forEach((t: string) => {
      document.querySelector('html').classList.remove(`${t}_theme`);
    });
    document.querySelector('html').classList.add(`${theme}_theme`);
    return `The theme is set to ${theme} now`;
  }

  public static ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  public createMenu() {
    const $sidebar = document.querySelector('nav#menu ul');
    this.pages.forEach(page => {
      let $item = document.createElement('li');
      $item.innerHTML = `
        <a href="#/${page.slug}" title="${page.name}">
          <span class="icon">
            <i class="fas fa-${page.icon}"></i>
          </span>
          <span class="word">${page.name}</span>
          <span class="sr-only">${page.name}</span>
        </a>
      `;
      $sidebar.appendChild($item);
    });
  }

  public createNavigationSystem() {
    let $items = document.querySelectorAll('nav#menu ul li a');
    $items.forEach($el => {
      $el.addEventListener(
        'click',
        ev => {
          ev.stopImmediatePropagation();
          let $e = ev.currentTarget as HTMLElement;
          this.viewPage($e.getAttribute('href').slice(2));
        },
        false
      );
    });
  }

  private _createCard(
    width,
    height,
    title = '',
    content = '',
    battery = -1,
    signal = -1
  ) {
    let $div = document.createElement('div');
    let cls = ['card'];
    $div.classList.add(...cls);
    let batteryContent = '';
    let signalContent = '';
    if (battery != -1) {
      let icon = '';
      if (0 == battery) icon = 'empty red';
      else if (0.25 == battery) icon = 'quarter';
      else if (0.5 == battery) icon = 'half';
      else if (0.75 == battery) icon = 'three-quarters';
      else if (1 == battery) icon = 'full text-green-600';
      batteryContent = `<span class="icon"><i class="fas fa-battery-${icon}"></i></span>`;
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
      <div class="card-wrapper">
        <div class="card-width-${width} card-height-${height}">
          ${content}
        </div>
      </div>
    `;
    return $div;
  }

  public createCardManagementSystem() {
    this._masis = new Masis('#cards');
    let self = this;

    for (
      let i = 1;
      i <= Math.max(this._maxCardWidthSize, this._maxCardHeightSize);
      i++
    ) {
      const $div = this._createCard(
        Math.min(i, this._maxCardWidthSize),
        Math.min(i, this._maxCardHeightSize)
      );
      document.querySelector('#cards').appendChild($div);
      const style = getComputedStyle($div);
      const rect = $div.getBoundingClientRect();
      let $iw, $ih;
      $iw =
        rect.width + parseInt(style.marginLeft) + parseInt(style.marginRight);
      $ih =
        rect.height + parseInt(style.marginTop) + parseInt(style.marginBottom);
      this._breakpoints.width.push($iw);
      this._breakpoints.height.push($ih);
      document.querySelector('#cards').removeChild($div);
    }

    this._masisMove = new MasisMove(this._masis, {
      class: '🏄',
      ghost: '👻',
      exclude: '🤖'
    });

    const resizeCard = ($el, width, height, setHeight = false) => {
      for (let i = 1; i < 6; i++) {
        $el.classList.remove(`card-width-${i}`);
        if (setHeight) $el.classList.remove(`card-height-${i}`);
      }
      $el.classList.add(`card-width-${width}`);
      if (setHeight) $el.classList.add(`card-height-${height}`);
    };

    this._masisResize = new MasisResize(this._masis, {
      class: '📐',
      active: '📜',
      selector: '.card-wrapper > div',
      breakpoints: this._breakpoints,
      callbackMove: ($card, w, h) => {
        let newW = parseInt(w) + parseInt($card.dataset.cardWidth);
        let newH = parseInt(h) + parseInt($card.dataset.cardHeight);
        if (newW < parseInt($card.dataset.cardMinWidth))
          newW = parseInt($card.dataset.cardMinWidth);
        if (newH < parseInt($card.dataset.cardMinHeight))
          newH = parseInt($card.dataset.cardMinHeight);
        if (newW > self._maxCardWidthSize) newW = self._maxCardWidthSize;
        if (newH > self._maxCardHeightSize) newW = self._maxCardHeightSize;
        resizeCard($card.querySelector('.card-title'), newW, newH);
        resizeCard(
          $card.querySelector('.card-wrapper > div'),
          newW,
          newH,
          true
        );
        $card.dataset.cardTmpWidth = newW;
        $card.dataset.cardTmpHeight = newH;
        MasisPosition(self._masis);
      },
      callbackEnd: $card => {
        $card.dataset.cardWidth = $card.dataset.cardTmpWidth;
        $card.dataset.cardHeight = $card.dataset.cardTmpHeight;
      }
    });

    this._masisDelete = new MasisDelete(this._masis, {
      class: '🗑️',
      message: 'Etes-vous sûr de vouloir supprimer cette tuile ?'
    });

    MasisPosition(this._masis, this._positionOptions);

    const resizeObserver = new ResizeObserver(entries => {
      MasisPosition(this._masis, this._positionOptions);
    });

    resizeObserver.observe(document.querySelector('#cards'));

    let wrenchState = false;

    document.querySelector('#button-design').addEventListener(
      'click',
      ev => {
        ev.preventDefault();
        wrenchState = !wrenchState;
        let $e = ev.currentTarget as HTMLElement;
        $e.classList.remove('active');
        if (wrenchState) {
          $e.classList.add('active');
          self._masis.$children.forEach($el => {
            $el.classList.add('🏄');
          });
        } else {
          self._masis.$children.forEach($el => {
            $el.classList.remove('🏄');
          });
        }
      },
      false
    );
  }

  public viewPage(slug: string) {
    if (slug.startsWith('!/')) slug = '';
    let found: Boolean = false;
    for (let page of this.pages) {
      if (page.slug == slug) {
        found = true;
        if (page.background != '') {
          let $cover = document.querySelector(
            '#illustration .cover'
          ) as HTMLDivElement;
          $cover.style.backgroundImage = `url(${page.background})`;
        }
        let $sidebar_items = document.querySelectorAll('#menu a');
        $sidebar_items.forEach(el => {
          let $e = el.parentNode as HTMLElement;
          $e.classList.remove('active');
          if (el.getAttribute('href') == `#/${page.slug}`)
            $e.classList.add('active');
        });
        this._populate(page.cards);
        break;
      }
    }
    if (!found) this.viewPage('');
  }

  private _postProcessConfigPageCode() {
    var toolbox = document.getElementById('toolbox');
    var workspace = Blockly.inject('blocklyDiv', {
      comments: true,
      collapse: true,
      disable: true,
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      toolbox: toolbox,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      }
    });
  }

  private _viewConfigPage(slug: string, title: string) {
    slug = slug.substr(2);
    let content: string = '';
    fetch(`/config_pages/${slug}.html`)
      .then(response => {
        return response.text();
      })
      .then(html => {
        this._generateConfigPage(title, html);
        if ('code' == slug) this._postProcessConfigPageCode();
      });
  }

  private _generateConfigPage(title: string, content: string) {
    let subpagetemplate: string = `
      <div class="subpage-wrapper">
        <div class="subpage-title">
          <span>${title}</span>
          <a id="subpage-close" href="#">&times;</a>
        </div>
        <div class="subpage-content">${content}</div>
      </div>
    `;
    let $subpage = document.createElement('div');
    $subpage.classList.add('subpage');
    $subpage.innerHTML = subpagetemplate;
    document.querySelector('body').appendChild($subpage);
    document.querySelector('#subpage-close').addEventListener(
      'click',
      () => {
        let sub = document.querySelector('.subpage');
        sub.parentNode.removeChild(sub);
      },
      true
    );
  }

  private _wrapperRendering(render: string): string {
    let result: string = render;
    result = result.replace(/-=\[ID\]=-/g, `_${Date.now()}`);
    return result;
  }

  private _generateCard(card) {
    card.properties.cardTitle = card.title;
    let $card = this._createCard(
      card.width,
      card.height,
      card.title,
      this._wrapperRendering(
        this.components[card.type].render(card.properties)
      ),
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

  private _populate(cards) {
    document.querySelector('#cards').innerHTML = '';
    let self = this;
    let cranberries = [];
    cards.forEach(card => {
      cranberries.push(
        new Promise(resolve => {
          YadomsHelper.loadComponent(card.type).then(() => {
            self._generateCard(card);
            resolve();
          });
        })
      );
    });
    Promise.all(cranberries).then(() => {
      this._masis.populate();
      MasisSort(this._masis, '[data-sort]');
      this._masisMove.init();
      this._masisResize.init();
      this._masisDelete.init();
      MasisPosition(this._masis);
    });
  }

  public manageAppLinks() {
    document.querySelectorAll('#menu-config a').forEach($a => {
      $a.addEventListener(
        'click',
        ev => {
          ev.stopImmediatePropagation();
          this._viewConfigPage(
            $a.getAttribute('href').slice(2),
            $a.getAttribute('title')
          );
        },
        true
      );
    });
  }
}

window.YadomsApp = new Yadoms();
