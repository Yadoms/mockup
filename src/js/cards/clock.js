import { ready, changeCardTitle, findAll } from "../functions";

const dateFormat = require("dateformat");

function displayClock($element) {
  $element.querySelector('.digits').innerHTML = dateFormat("hh:MM:ss");
  $element.querySelector('.ampm').innerHTML = dateFormat("TT");
}

ready(() => {
  setInterval(() => {
    let $clocks = findAll(".clock");
    if ($clocks.length)
      $clocks.forEach(($el) => {
        changeCardTitle($el, dateFormat("mmmm d, yyyy"));
        displayClock($el);
      });
  }, 1000);
});
