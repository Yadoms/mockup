import { ready, findAll } from '../functions';

ready(() => {
  let $thermometers = findAll('.thermometer');
  if ($thermometers.length)
    $thermometers.forEach($thermometer => {
      const min  = $thermometer.dataset.min,
            max  = $thermometer.dataset.max,
            val  = $thermometer.dataset.value,
            unit = $thermometer.dataset.unit;
      let percent = 100 * (val - min) / (max - min),
          $bar = $thermometer.querySelector('.bar'),
          $liquids = $thermometer.querySelectorAll('.liquid');
      $bar.style.height = percent + '%';
      $bar.querySelector('div').innerHTML = val + unit;
      $liquids.forEach($liquid => {
        if (percent < 20)
          $liquid.classList.add('frost');
        else if (percent < 40)
          $liquid.classList.add('cold');
        else if (percent < 60)
          $liquid.classList.add('normal');
        else if (percent < 80)
          $liquid.classList.add('warm');
        else
          $liquid.classList.add('hot');
      });
    });
});