import { ready, findAll, changeCardTitle } from "../functions";

ready(() => {
  let $forecasts = findAll(".forecast");
  if ($forecasts.length)
    $forecasts.forEach(($forecast) => {
      changeCardTitle($forecast, $forecast.dataset.city);
      let $rains = $forecast.querySelectorAll(".forecast-rain");
      if ($rains.length)
        $rains.forEach(($rain) => {
          let percent = (100 * parseFloat($rain.dataset.rain)) / 45;
          if (percent > 100) percent = 100;
          $rain.querySelector(".liquid").style.height = `${percent}%`;
        });
    });
});
