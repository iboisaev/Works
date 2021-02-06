function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}else{
		document.querySelector('body').classList.add('no-webp');
	}
});
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

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
	const header = $('.header');

function changingHeader() {
	if ($(window).scrollTop() > 50) {
		header.addClass('scroll');
	} else {
		header.removeClass('scroll');
	}
}

// For changing bg color of header on scrolling
window.addEventListener('scroll', changingHeader);
window.addEventListener('load', changingHeader);
	// sliders
	function changeSliderPadding() {
	const slider      = $('.projects__slider-wrapper'),
		  pdContainer = $('.container').css('margin-left');

	slider.css('margin-left', pdContainer);
}

changeSliderPadding();

$( window ).resize(function() {
	changeSliderPadding();
});

$('.projects__slider').slick({
	dots: true,
	loop: false,
	infinite: false,
	slidesToShow: 4,
	slidesToScroll: 1,
	rows: 2,
	appendArrows: $('.projects__arrows'),
	prevArrow: '<button class="slick-prev"><img src="img/icons/arrow_l.svg" alt=""></button>',
	nextArrow: '<button class="slick-next"><img src="img/icons/arrow_r.svg" alt=""></button>',
	appendDots: $('.projects__dots'),

	responsive: [
		{
			breakpoint: 769,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 577,
			settings: {
				slidesToShow: 2,
			}
		},
	]
});

	// maps
	const mapTopOffset = $('.contacts').offset().top - 200;

$(window).bind('scroll', function () {
	const windowTop = $(this).scrollTop();

	if (windowTop > mapTopOffset) {
		$('.map').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af384c1f388e7d53a81083d39350092aceddc2754430bef390e3935f950e125e8&amp;source=constructor" width="100%" height="100%"></iframe>')
		$(window).unbind('scroll');
	}
});
	// masked input
	/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);
	// forms
	// 6LceWkgaAAAAAJlR69-Cln0l26jfWKBsAFBMHkJm
// 6LceWkgaAAAAAE3iOLIKTX-f6JLu3MC0y7xb693t

grecaptcha.ready(function() {
	grecaptcha.execute();
});

$('.form__btn').on('click', function (e) {
	e.preventDefault();

	let $thisBtn 	  = $(this),
		$form 	 	  = $thisBtn.closest('.form');
		inputName 	  = $form.find('.input-name').val(),
		inputPhone    = $form.find('.input-phone').val(),
		inputCheckbox = $form.find('.hidden-checkbox').prop( "checked" ),
		formError 	  = $form.find('.form__error');

	function ajaxSend() {
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data: $form.serialize(),
			success: function () {
				$form.trigger("reset");
				$('.form__success').css('display', 'block');
				setTimeout(function() {
					$('.form__success').css('display', 'none');
				}, 12000);
			},
			error: function () {
				alert('Проверьте ваш интернет');
			}
		});
	}

	if (inputName.length  >=  2 && 
		inputName         !== ' ' &&
		inputPhone 		  !== ''  && 
		inputPhone 	      !== ' ' &&
		inputCheckbox     !== false) 
	{
		if (formError.hasClass('active')) {
			formError.removeClass('active');
		}

		ajaxSend();
	} else {
		formError.addClass('active');
	}
// .length
});

	// маска для полей ввода 
	$('input[type="tel"]').mask('+7 (999) 999-99-99');

});

function onSubmit(token) {
	console.log('you are not a robot');
}