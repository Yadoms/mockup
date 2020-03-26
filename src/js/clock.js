import { ready } from './functions';

function displayClock($element) {
  const dateFormat = require('dateformat');
  let date = new Date();
  $element.innerHTML = dateFormat(date, "mediumTime");
  let $title = $element.parentNode.parentNode.querySelector('div:first-child');
  $title.classList.remove('hidden');
  $title.querySelector('p').innerHTML = dateFormat(date, "longDate");
}

ready( () => {
  setInterval( 
    () => {
      let $clocks = document.querySelectorAll('.clock');
      if ($clocks.length)
        $clocks.forEach($el => {
          displayClock($el);
        })
    }, 
    1000 
  );
} );