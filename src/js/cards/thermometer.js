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
          $bar = $thermometer.querySelector('.bar');
      $bar.style.height = percent + '%';
      if (percent < 20)
        $thermometer.classList.add('frost');
      else if (percent < 40)
        $thermometer.classList.add('cold');
      else if (percent < 60)
        $thermometer.classList.add('normal');
      else if (percent < 80)
        $thermometer.classList.add('warm');
      else
        $thermometer.classList.add('hot');
    });
});