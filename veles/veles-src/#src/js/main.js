@@include("components/testWebp.js")
@@include("components/dynamicAdapt.js")

// Native JS
const doc = document;

// after DOMContentLoaded
doc.addEventListener('DOMContentLoaded', function () {

	// переменные const
	const body              = doc.getElementsByTagName('body')[0],
		  headerNav         = doc.querySelector('.header__list'),
		  menuBurger        = doc.querySelector('.menu-burger'),
		  menuBurgerIcon    = doc.querySelector('.menu-burger__icon'),
		  btnUp             = doc.querySelector('.btn-up'),
		  callbackPopup     = doc.querySelector('.callback-popup'),
		  popup             = doc.querySelectorAll('.popup'),
		  closePopup        = doc.querySelectorAll('.popup__close'),
		  openPopup         = doc.querySelectorAll('.open-js'),
		  lockPadding 		= doc.querySelectorAll('.lock-padding'),
		  lockMargin  		= doc.querySelectorAll('.lock-margin'),
		  lazyAnchor        = doc.querySelectorAll('.lazy-anchor'),
		  timeout    		= 500;

	// переменные let
	let unlock = true;

	// Блокировка скроллбара
	function bodyLock() {
		const lockPaddingValue = window.innerWidth - doc.querySelector('.wrapper').offsetWidth + 'px';
		
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
			    const el = lockPadding[index];
			    el.style.paddingRight = lockPaddingValue;
			}
		}

		if (lockMargin.length > 0) {
			for (let index = 0; index < lockMargin.length; index++) {
			    const el = lockMargin[index];
			    el.style.marginRight = lockPaddingValue;
			}
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add('locked');

		unlock  = false;
		setTimeout(function() {
			unlock = true;
		}, timeout);
	}

	// Отмена блокировки скроллбара
	function bodyUnlock() {
		setTimeout(function() {
			if (lockPadding) {
				for (let index = 0; index < lockPadding.length; index++) {
				    const el = lockPadding[index];
				    el.style.paddingRight = '0px';
				}
			}

			if (lockMargin) {
				for (let index = 0; index < lockMargin.length; index++) {
				    const el = lockMargin[index];
				    el.style.marginRight = '0px';
				}
			}

			body.style.paddingRight = 0;
			body.classList.remove('locked');	
		}, timeout);
		

		unlock  = false;
		setTimeout(function() {
			unlock = true;
		}, timeout);
	}

	// Функция для открытия попапа
	function popupOpen(which) {
		if (unlock) {
			which.classList.add('open');
			bodyLock();
			return which;
		}
	}
	
	// Функция для закрытия попапа
	function popupClose(which) {
		if (unlock) {
			which.classList.remove('open');
			bodyUnlock();
			return which;
		}
	}
	
	// Функция для открытия/закрытия меню бургера
	function toggleMenuBurger() {
		menuBurger.classList.toggle('active');
		headerNav.classList.toggle('active');
	}

	// открытие навигации при нажатии на меню бургер
	menuBurger.addEventListener('click', function () {
		toggleMenuBurger();
	});

	document.addEventListener('click', function(e) {
		if (
			e.target != headerNav && 
			e.target != menuBurger &&
			e.target != menuBurgerIcon
			) {
			menuBurger.classList.remove('active');
			headerNav.classList.remove('active');
		}
	});

	// Плавная прокрутка якоря
	lazyAnchor.forEach(link => {
	    link.addEventListener('click', function(e) {
	        e.preventDefault();

	        let href = this.getAttribute('href').substring(1);
	        const scrollTarget = document.getElementById(href);
	        const topOffset = 120;
	        // const topOffset = 0; // если не нужен отступ сверху 
	        const elementPosition = scrollTarget.getBoundingClientRect().top;
	        const offsetPosition = elementPosition - topOffset;

	        window.scrollBy({
	            top: offsetPosition,
	            behavior: 'smooth',
	        });
	    });
	});

	// открытие попава при нажатии на кнопки с классом .open-js
	openPopup.forEach(item => {
		item.addEventListener('click', function() {
			popupOpen(callbackPopup);
		});
	});
	// закрытие попава при нажатии на кнопки с классом .popup__close
	closePopup.forEach(item => {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			popupClose(this.closest('.popup'));
		});
	});
	// закрытие попава при нажатии вне попапа (затемненный фон)
	popup.forEach(item => {
		item.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__body')) {
				popupClose(item);
			}
		});
	});
	// закрытие попава при нажатии на кнопку Esc на клавиатуре
	doc.addEventListener('keydown', function(e) {
		if (e.which === 27) {	
			popupClose(doc.querySelector('.popup.open'));
		}
	});

	// init wow js library
	var wow = new WOW({
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		// the callback is fired every time an animation is started
		// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null,    // optional scroll container selector, otherwise use window,
		resetAnimation: true,     // reset animation on end (default is true)
	});
	wow.init();

	// Скрипт для кнопки наверх 
	window.addEventListener('scroll', function() {
		if (window.scrollY > 500) {
		   btnUp.classList.remove('hide');
		 } else {
		   btnUp.classList.add('hide');
		 }
	});
});


// JQuery
$(doc).ready(function() {
	// header
	@@include("components/header.js")
	// sliders
	@@include("components/sliders.js")
	// maps
	@@include("components/maps.js")
	// masked input
	@@include("jquery.maskedinput.min.js")
	// forms
	@@include("components/forms.js")

	// маска для полей ввода 
	$('input[type="tel"]').mask('+7 (999) 999-99-99');

});

function onSubmit(token) {
	console.log('you are not a robot');
}