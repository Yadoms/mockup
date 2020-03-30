if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.add('yadoms_theme_dark');
else
  document.documentElement.classList.remove('yadoms_theme_dark');

function Yadoms() {
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

Yadoms.prototype.help = () => {
  console.log("List of functions available")
  console.table({
    'yadoms.lightOn()': 'Change the current theme to the light mode',
    'yadoms.lightOff()': 'Change the current theme to the dark mode',
    'yadoms.changeTheme(theme)': 'Change the current theme to a specific theme'
  });
}

Yadoms.prototype.lightOn = () => {
  document.documentElement.className = '';
};

Yadoms.prototype.lightOff = () => {
  document.documentElement.className = '';
  document.documentElement.classList.add('yadoms_theme_dark');
};

Yadoms.prototype.changeTheme = (theme) => {
  document.documentElement.className = '';
  document.documentElement.classList.add('yadoms_theme_' + theme);
}

window.yadoms = new Yadoms;