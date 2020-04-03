import { ready, changeCardTitle, findAll } from "../functions";

const dateFormat = require("dateformat");

function displayClock($element) {
  $element.innerHTML = dateFormat("mediumTime");
}

ready(() => {
  setInterval(() => {
    let $clocks = findAll(".clock");
    if ($clocks.length)
      $clocks.forEach(($el) => {
        changeCardTitle($el, dateFormat("longDate"));
        displayClock($el);
      });
  }, 1000);
});
