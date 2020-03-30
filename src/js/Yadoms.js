import { findAll } from './functions';

class Yadoms {
  constructor() {
    console.log("\
  __ __       _                \n\
 |  |  |___ _| |___ _____ ___  \n\
 |_   _| .'| . | . |     |_ -| \n\
   |_| |__,|___|___|_|_|_|___| \n\
 \n\
 Welcome to the dev world!\n\
 To have any help, type yadoms.help()\
 ");
  }
  help() {
    console.log("List of functions available");
    console.table({
      'yadoms.lightOn()': 'Change the current theme to the light mode',
      'yadoms.lightOff()': 'Change the current theme to the dark mode',
      'yadoms.changeTheme(theme)': 'Change the current theme to a specific theme',
      'yadoms.weather(conditions)': 'Change the current weather, conditions are :',
      'yadoms.weather(conditions).': 'bolt, cloud, cloud-moon, cloud-moon-rain, cloud-rain,',
      'yadoms.weather(conditions)..': 'cloud-showers-heady, cloud-sun, cloud-sun-rain,',
      'yadoms.weather(conditions)...': 'moon, smog, snowflake, sun.'
    });
  }
  lightOn() {
    document.documentElement.className = '';
  }
  lightOff() {
    document.documentElement.className = '';
    document.documentElement.classList.add('yadoms_theme_dark');
  }
  changeTheme(theme) {
    document.documentElement.className = '';
    document.documentElement.classList.add('yadoms_theme_' + theme);
  }
  weather(conditions) {
    let $weathers = findAll('.weather');
    $weathers.forEach($weather => {
      $weather.querySelector('.indicator i').className = 'fas fa-' + conditions;
    });
    return 'now it\'s : ' + conditions;
  }
}

window.yadoms = new Yadoms;