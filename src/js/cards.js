import { ready } from './functions';
import { Masis, MasisPosition } from 'masis';

ready(() => {

  var m = new Masis('#cards');
  setTimeout(() => {
    MasisPosition(m);

    const resizeObserver = new ResizeObserver(entries => {
      MasisPosition(m);
    });
    
    resizeObserver.observe(document.querySelector('#cards'));
  }, 500);
});
