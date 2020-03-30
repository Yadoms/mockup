import { ready, changeCardTitle, findAll, findCardTitle } from '../functions';

function displayClock($element) {
  const dateFormat = require('dateformat');
  let date = new Date();
  $element.innerHTML = dateFormat(date, "mediumTime");
  changeCardTitle($element, dateFormat(date, "longDate"));
}

ready( () => {
  setInterval( 
    () => {
      let $clocks = findAll('.clock');
      if ($clocks.length)
        $clocks.forEach($el => {
          displayClock($el);
        })
    }, 
    1000 
  );
} );