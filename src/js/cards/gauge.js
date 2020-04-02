import { ready, findAll } from '../functions';

ready(() => {
  let $gauges = findAll('.gauge');
  if ($gauges.length)
    $gauges.forEach($gauge => {
      const min  = $gauge.dataset.min,
            max  = $gauge.dataset.max,
            val  = $gauge.dataset.value,
            $fill = $gauge.querySelector('.fill');
      let percent = 100 * (val - min) / (max - min);
      $fill.style.height = percent + '%';
      if (percent < 20)
        $gauge.classList.add('frost');
      else if (percent < 40)
        $gauge.classList.add('cold');
      else if (percent < 60)
        $gauge.classList.add('normal');
      else if (percent < 80)
        $gauge.classList.add('warm');
      else
        $gauge.classList.add('hot');
    });
});