$(document).ready(function() {
	// Переменные =============================================================================================================================
	const navItems = $('.nav__items'),
	      body = $('body'),
	      fixedMenu = $('.fixed__menu'),
	      fixedClose = $('.fixed__close'),
	      thanksPopup = $('.thanks-popup');

	// Функции =============================================================================================================================
	// Функция для открытия меню бургера 
	function openMenuBurger() {
		navItems.addClass('nav__left0');
		body.addClass('blocked');  // блокирование скролла страницы при открытом меню
		fixedMenu.css('display', 'none');
		fixedClose.css('display', 'block');
	}

	// Функция для закрытия меню бургера
	function closeMenuBurger() {
		navItems.removeClass('nav__left0');
		body.removeClass('blocked');  // разрешаю скроллится странице при закрытии меню
		fixedMenu.css('display', 'block');
		fixedClose.css('display', 'none');
	}

	// Функция для открытия попапов
	function openPopups(popup) {
		$(popup).removeClass('hide');
		body.addClass('blocked');
		return popup;
	}

	// Функция для закрытия попапов
	function closePopups() {
		$('.popup').addClass('hide');
		body.removeClass('blocked');
	}

	// Открытие меню при клике на меню бургер =====================================================================================
	fixedMenu.on('click', function () {
		openMenuBurger();
	});

	// Закрытие меню при клике на крестик =======================================================================================
	fixedClose.on('click', function () {
		closeMenuBurger();
	});

	// Закрытие меню при клике на пункты меню, после проверки (для адаптива) =======================================================================================
	if ($(window).width() <= 768) {
		
		$('.nav__item').on('click', function () {
			closeMenuBurger();
		});

	};

	// Плавная прокрутка якоря =============================================================================================
    $('a[href^="#"], *[data-href^="#"]').on('click', function(e){
        e.preventDefault();
        let t = 1300;
        let d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
    });

	// инициализация и настройки slick слайдера с видеороликами =================================================================================
	$('.reviews__videos').slick({
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: false,
	  draggable: true,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 2,
	        autoplay: true,
	        autoplaySpeed: 6000,
	      }
	    },
	    {
	      breakpoint: 692,
	      settings: {
	        slidesToShow: 1,
	        autoplay: true,
	        autoplaySpeed: 6000,
	      }
	    }
	  ]
	});

	// инициализация и настройки slick слайдера с партнерами =================================================================================
	$('.partners__slider').slick({
	  lazyLoad: 'ondemand',
	  infinite: true,
	  speed: 500,
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  autoplay: true,
  	  autoplaySpeed: 2500,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        arrows: false
	      }
	    },
	    {
	      breakpoint: 750,
	      settings: {
	        slidesToShow: 2,
	        arrows: false
	      }
	    },
	    {
	      breakpoint: 500,
	      settings: {
	        slidesToShow: 1,
	        arrows: false
	      }
	    }
	  ]
	});

	// скрипты для модальных окон ================================================================================================
	// открытие модального окна для заказа звонка
	$('.fixed__btn, .btn-tariffs').on('click', function () {
		openPopups('.short-popup');
	});

	// открытие модального окна для заказа юриста
	$('.lawyer__btn, .btn-tariffs-buy').on('click', function () {
		openPopups('.long-popup');
	});

	// открытие модального окна для доп. инфо-ии
	$('.info-advantage__btn').on('click', function (event) {
		event.preventDefault();
		openPopups('.more-popup');
	});

	// закрытие модальных окон при клике на крестик
	$('.close').on('click', function () {
		closePopups();
	});

	// закрытие модальных окон по клику вне окна
	$(document).mouseup(function (e) { 
		let popup = $('.popup__body');

		if (
			e.target != popup[0] &&
			e.target != popup[1] &&
			e.target != popup[2] &&
			e.target != popup[3] &&
			popup.has(e.target).length === 0
			){
			closePopups();
			
		}
	});

	// маска для полей ввода ================================================================================================
    $('input[type="tel"]').mask('+7 (999) 999-99-99');

    //E-mail Ajax Send ==========================================================================================================
	$('#contact-block__form').submit(function() {
		let th = $(this);
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data: th.serialize()
		}).done(function() {
			openPopups(thanksPopup);
			th.trigger("reset");
			setTimeout(function() {
				closePopups();
			}, 4000);
		});
		return false;
	});

	//E-mail Ajax Send для форм в попапе ==========================================================================================================
	$('#long-popup__form, #short-popup__form').submit(function() {
		let th = $(this);
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data: th.serialize()
		}).done(function() {
			closePopups();
			openPopups(thanksPopup);
			th.trigger("reset");
			setTimeout(function() {
				closePopups();
			}, 4000);
		});
		return false;
	});

	// Скрипт для кнопки наверх ==========================================================================================================
	$(window).scroll(function() {
		let btnUp = $('.btn-up');

		if ($(window).scrollTop() > 500) {
		   btnUp.removeClass('hide');
		 } else {
		   btnUp.addClass('hide');
		 }
	});

});