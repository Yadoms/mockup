import { changeTheme } from './functions';

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
)
  changeTheme('dark');
else changeTheme('light');
