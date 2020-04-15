 const shoppingCard = document.querySelector('.shoppingCard');
 const modal = document.querySelector('.modal');
 const close = document.querySelector('.modal__close');
 const lockedBody = document.getElementsByTagName('body')[0];

	// открытие модального окна при клине на кнопку "Корзина"
 shoppingCard.addEventListener('click', function(event) {
 	modal.classList.add('is-open');
 	lockedBody.classList.add('locked');
 });

	// закрытие модального окна при клине на крестик
 close.addEventListener('click', function(event) {  
 	modal.classList.remove('is-open');
 	lockedBody.classList.remove('locked');
 });

 new WOW().init();