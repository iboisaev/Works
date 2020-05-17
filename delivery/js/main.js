	// переменные, используемые при открытии и закрытии корзины
const shoppingCard = document.querySelector('.shoppingCard'),
      modal = document.querySelector('.modal'),
      close = document.querySelector('.modal__close'),
      cancel = document.querySelector('.modal__cancel'),
      lockedBody = document.getElementsByTagName('body')[0];


	// открытие корзины при клине на кнопку "Корзина"
shoppingCard.addEventListener('click', function(event) {
	modal.classList.add('is-open');
	lockedBody.classList.add('locked');
});

	// закрытие корзины при клине на "Крестик"
close.addEventListener('click', function(event) {  
	modal.classList.remove('is-open');
	lockedBody.classList.remove('locked');
});

 	// закрытие корзины при клине на кнопку "Отменить"
cancel.addEventListener('click', function(event) {  
 	modal.classList.remove('is-open');
 	lockedBody.classList.remove('locked');
});

new WOW().init();