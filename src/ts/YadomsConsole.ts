import { Yadoms } from './Yadoms';
import { themes } from './YadomsThemes';

export class YadomsConsole {
  public constructor() {
    console.log(`
 __ __       _               
|  |  |___ _| |___ _____ ___ 
|_   _| .'| . | . |     |_ -|
  |_| |__,|___|___|_|_|_|___|
Welcome to the dev world!
To have any help, type Yadoms.help()
`);
  }

  public help(func = '') {
    if (func != '') {
      if ('changeTheme' == func) {
        console.log('List of available themes');
        console.table(themes);
      }
    } else if ('' == func) {
      console.log('List of available functions');
      console.table({
        'Yadoms.lightOn()': 'Change the current theme to the light mode',
        'Yadoms.lightOff()': 'Change the current theme to the dark mode',
        'Yadoms.changeTheme(theme)':
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

  public lightOn() {
    return Yadoms.changeTheme('');
  }

  public lightOff() {
    return Yadoms.changeTheme('dark');
  }
}
