import { ready, changeCardTitle, findAll } from '../functions';

const moment = require('moment');

function displayClock($element) {
  $element.innerHTML = moment().format("h:MM:ss A");
}

ready(() => {
  setInterval( 
    () => {
      let $clocks = findAll('.clock');
      if ($clocks.length)
        $clocks.forEach($el => {
          changeCardTitle($el, moment().format("MMMM do, YYYY"));
          displayClock($el);
        });
    }, 
    1000 
  );
});