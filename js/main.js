 const shoppingCard = document.querySelector('.shoppingCard');
 const modal = document.querySelector('.modal');
 const close = document.querySelector('.modal__close');

 shoppingCard.addEventListener('click', function(event) {
 	modal.classList.add('is-open');
 });

 close.addEventListener('click', function(event) {
 	modal.classList.remove('is-open');
 });

 new WOW().init();