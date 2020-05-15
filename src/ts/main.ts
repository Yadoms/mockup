import { Yadoms } from './Yadoms';
import { YadomsConsole } from './YadomsConsole';
import { YadomsLoader } from './YadomsLoader';

declare global {
  interface Window {
    Yadoms: YadomsConsole;
    YadomsLoader: YadomsLoader;
  }
}

Yadoms.ready(() => {
  window.Yadoms = new YadomsConsole();

  fetch('/yadoms.instance.json')
    .then((response) => response.json())
    .then((json) => {
      window.YadomsApp.pages = json.instance.pages;
      window.YadomsApp.createMenu();
      window.YadomsApp.createNavigationSystem();
      window.YadomsApp.createCardManagementSystem();
      window.YadomsApp.viewPage(window.location.hash.slice(2));
    });
});
