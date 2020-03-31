import iro from '@jaames/iro';
import { ready, findAll } from '../functions';

ready(() => {
  let $rgbColorPickers = findAll('.rgb-color-picker .colorpicker');
  if ($rgbColorPickers.length)
    $rgbColorPickers.forEach($element => {
      let cp = new iro.ColorPicker($element, {
        width: 150,
        color: $element.dataset.color,
        wheelLightness: false,
        layout: [
          { 
            component: iro.ui.Wheel,
            options: {}
          },
        ]
      });
    });

  let $rgbwColorPickers = findAll('.rgbw-color-picker .colorpicker');
  if ($rgbwColorPickers.length)
    $rgbwColorPickers.forEach($element => {
      let cp = new iro.ColorPicker($element, {
        width: 150,
        color: $element.dataset.color
      });
      /*
      cp.on('color:change', (color, changes) => {
        console.log(color.hexString, changes)
      });
      */
    });
});