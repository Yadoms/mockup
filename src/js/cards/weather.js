import { ready, changeCardTitle, findAll } from '../functions';

ready(() => {
  let $weathers = findAll('.weather');
  $weathers.forEach($weather => {
    changeCardTitle($weather, $weather.dataset.location);
  });
});