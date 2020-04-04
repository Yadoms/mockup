import { ready, changeCardTitle, findAll } from "../functions";

const dateFormat = require("dateformat");

function displayClock($element, seconds = false) {
  $element.querySelector('.digits').innerHTML = dateFormat("hh:MM" + (seconds ? ':ss' : ''));
  $element.querySelector('.ampm').innerHTML = dateFormat("TT");
}

ready(() => {
  let $clocks = findAll(".clock");
  if ($clocks.length)
    setInterval(() => {
      $clocks.forEach(($el) => {
        changeCardTitle($el, dateFormat("mmmm d, yyyy"));
        displayClock($el, $el.dataset.seconds);
      });
    }, 1000);
});
