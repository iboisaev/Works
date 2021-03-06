// Native JS
const doc = document;

// Preloader
window.addEventListener('load', function() {
	const preloader = doc.querySelector('.preloader');
	setTimeout(function() {
		preloader.classList.add("done");
	}, 1000);
});

// after DOMContentLoaded
doc.addEventListener('DOMContentLoaded', function () {

	// переменные const
	const body = doc.getElementsByTagName('body')[0],
		header = doc.querySelector('.header'),
		headerMenu = doc.querySelector('.header__menu'),
		headerSearch = doc.querySelector('.header__search'),
		headerBtn = doc.querySelector('.header__btn'),
		iconSearch = doc.querySelector('.icon--search'),
		iconClose = doc.querySelector('.icon--close'),
		menuBurger = doc.querySelector('.menu-burger'),
		btnUp = doc.querySelector('.btn-up'),
		dropdown = doc.querySelectorAll('.dropdown'),
		lazyAnchor = doc.querySelectorAll('.lazy-anchor'),
		lockPadding = doc.querySelectorAll('.lock-padding'),
		lockMargin = doc.querySelectorAll('.lock-margin'),
		timeout = 500;


	// переменные let
	let unlock = true;

	// 
	if (window.innerWidth >= 768) {
		header.classList.add('lock-padding');
	}

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

	// Функция для открытия/закрытия меню бургера
	function toggleMenuBurger() {
		menuBurger.classList.toggle('active');
		headerMenu.classList.toggle('active');
		bodyLock();

		if (!(menuBurger.classList.contains('active') || headerMenu.classList.contains('active'))) {
			bodyUnlock();
		}
	}

	// обработчик события для открытия/закрытия поля поиска
	headerBtn.addEventListener('click', function () {
		headerSearch.classList.toggle('active');
		iconSearch.classList.toggle('active');
		iconClose.classList.toggle('active');
	});

	// открытие навигации при нажатии на меню бургер
	menuBurger.addEventListener('click', function () {
		if (unlock) {
			toggleMenuBurger();
		}
	});

	// Скрипт для кнопки наверх 
	window.addEventListener('scroll', function() {
		if (window.scrollY > 700) {
		   btnUp.classList.remove('hide');
		 } else {
		   btnUp.classList.add('hide');
		 }
	});

	lazyAnchor.forEach(link => {
	    link.addEventListener('click', function(e) {
	        e.preventDefault();

	        let href = this.getAttribute('href').substring(1);
	        const scrollTarget = document.getElementById(href);
	        const topOffset = 30;
	        // const topOffset = 0; // если не нужен отступ сверху 
	        const elementPosition = scrollTarget.getBoundingClientRect().top;
	        const offsetPosition = elementPosition - topOffset;

	        window.scrollBy({
	            top: offsetPosition,
	            behavior: 'smooth',
	        });
	    });
	});

	// For customer dropdown
	dropdown.forEach(function(item) {
		const dropdownItems = item.querySelector('.dropdown__items'),
			dropdownItem = item.querySelectorAll('.dropdown__item'),
			dropdownText = item.querySelector('.dropdown__text');
		
		item.addEventListener('mouseover', function(e) {
			dropdownItems.classList.add('active');
		});

		item.addEventListener('mouseout', function(e) {
			dropdownItems.classList.remove('active');
		});
		
		dropdownItem.forEach(function(item) {
			item.addEventListener('click', function() {
				dropdownText.innerText = item.innerText;
				dropdownItems.classList.remove('active');
			});
		});
	});


	// инициализация swiper слайдера
	if (doc.querySelector('.slider')) {
		var mySwiper = new Swiper('.slider', {
			// Optional parameters
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			keyboard: {
				enabled: true,
			},

			// pagination
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// breakpoints
			breakpoints: {
				10: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				993: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1231: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			}
		});
	}

	// инициализация другого swiper слайдера
	if (doc.querySelector('.reviews__slider')) {
		var mySwiper2 = new Swiper('.reviews__slider', {
			// Optional parameters
			slidesPerView: 1,
			loop: true,
			autoHeight: true,

			autoplay: {
				delay: 5000,
			},

			// pagination
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}
		});
	}

	if (doc.querySelector('.slider-post')) {
		let sliderPost = new Swiper('.slider-post', {
			// Optional parameters
			slidesPerView: 1,
			loop: true,

			// navigation
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// pagination
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}

	// инициализация video JS, после проверки на наличие
	if (doc.querySelector('#my-video')) {
		let player = videojs('my-video', {
			plugins: {
				hotkeys: {}
			}
		});
	}

});


// JQuery
$(doc).ready(function(){

	// переменные const
	const thanksPopup = $('.thanks-popup');

	// Функция для открытия попапа
	function popupOpen(which) {
		which.addClass('open');
		return which;
	}
	
	// Функция для закрытия попапа
	function popupClose(which) {
		which.removeClass('open');
		return which;
	}

    // 
    $('.form').submit(function() {
		let th = $(this);
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data: th.serialize()
		}).done(function() {
			popupOpen(thanksPopup);
			th.trigger("reset");
			setTimeout(function() {
				popupClose(thanksPopup);
			}, 4000);
		});
		return false;
	});

});