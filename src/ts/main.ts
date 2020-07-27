import { Yadoms } from './Yadoms';
import { YadomsConsole } from './YadomsConsole';
import { YadomsHelper } from './YadomsHelper';

declare global {
  interface Window {
    Yadoms: YadomsConsole;
    YadomsHelper: YadomsHelper;
  }
}

Yadoms.ready(() => {
  window.Yadoms = new YadomsConsole();
  window.YadomsHelper = new YadomsHelper();

  fetch('/yadoms.instance.json')
    .then(response => response.json())
    .then(json => {
      window.YadomsApp.pages = json.instance.pages;
      window.YadomsApp.createMenu();
      window.YadomsApp.createNavigationSystem();
      window.YadomsApp.createCardManagementSystem();
      window.YadomsApp.manageAppLinks();
      window.YadomsApp.viewPage(window.location.hash.slice(2));
    });
});
