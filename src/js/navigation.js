/*


ready(() => {
  const $items = document.querySelectorAll('#menu a');
  $items.forEach($item => {
    $item.addEventListener('click', (ev) => {
      ev.preventDefault();
      let href = event.currentTarget.getAttribute('href');
      history.pushState(null, 
                        event.currentTarget.querySelector('span').textContent, 
                        href
                       );
      $items.forEach($i => {
        $i.classList.remove('active');
      })
      event.currentTarget.classList.add('active');
      ev.stopPropagation();
    }, false);
  });
  
});
*/
