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
  help(func = '') {
    if (func != '')
    {
      if ('changeTheme' == func)
      {
        console.log('List of available themes');
        console.table(['light', 
                       'dark', 
                       'lidrea'
                      ]);
      }
      else if ('weather' == func)
      {
        console.log('List of available conditions');
        console.table(['bolt', 
                       'cloud', 
                       'cloud-moon', 
                       'cloud-moon-rain', 
                       'cloud-rain',
                       'cloud-showers-heady', 
                       'cloud-sun', 
                       'cloud-sun-rain',
                       'moon', 
                       'smog', 
                       'snowflake', 
                       'sun'
                      ]);
      }
    }
    else if ('' == func)
    {
      console.log("List of available functions");
      console.table({
        'yadoms.lightOn()': 'Change the current theme to the light mode',
        'yadoms.lightOff()': 'Change the current theme to the dark mode',
        'yadoms.changeTheme(theme)': 'Change the current theme to a specific theme',
        'yadoms.weather(conditions)': 'Change the current weather'
      });
      console.log('To have more information about a function, gives the name of the function in parameter.');
      console.info('Example : yadoms.help(\'weather\').');
    }
    else
    {
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
    document.documentElement.className = '';
    document.documentElement.classList.add('yadoms_theme_' + theme);
    return 'The theme is set to ' + theme + ' now';
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