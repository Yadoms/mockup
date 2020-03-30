import { ready, findAll } from '../functions';

require(['odometer'], (Odometer) => {
  window.odometerOptions = {
    auto: false
  };

  class YadomsOdometer extends Odometer {
    hack($element) {
      let $fms = $element.querySelectorAll('.odometer-formatting-mark');
      if ($fms.length)
      {
        let $fm = $fms[$fms.length - 1];
        $fm.classList.add('odometer-hacking-mark');
      }
      let $el = document.createElement('span');
      $el.className = 'odometer-formatting-mark odometer-suffix-mark';
      $el.innerHTML = $element.dataset.suffix;
      let $inside = $element.querySelector('.odometer-inside');
      $inside.appendChild($el);
    }    
  }
  
  ready(() => {
    var $counters = findAll('.odometer');
    $counters.forEach($counter => {
      let odo = new YadomsOdometer({
        el: $counter,
        val: 0,
        format: '(.ddd)',
        duration: 1000,
        minimumIntegerDigit: 9
      });
      $counter.addEventListener('odometerdone', (ev) => {
        odo.hack(ev.currentTarget);
      });
      odo.update($counter.dataset.value);
      odo.hack($counter);
    });
  });

});