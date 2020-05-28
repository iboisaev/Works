$(document).ready(function() {

	// Функции =============================================================================================================================
	// Функция для открытия меню бургера 
	function openMenuBurger() {
		$('.nav__items').addClass('nav__left0');
		$('body').addClass('blocked');  // блокирование скролла страницы при открытом меню
		$('.fixed__menu').css('display', 'none');
		$('.fixed__close').css('display', 'block');
	}

	// Функция для закрытия меню бургера
	function closeMenuBurger() {
		$('.nav__items').removeClass('nav__left0');
		$('body').removeClass('blocked');  // разрешаю скроллится странице при закрытии меню
		$('.fixed__menu').css('display', 'block');
		$('.fixed__close').css('display', 'none');
	}

	// Функция для закрытия попапов
	function closePopups() {
		$('.popup').addClass('hide');
		$('body').removeClass('blocked');
	}

	// Открытие меню при клике на меню бургер =====================================================================================
	$('.fixed__menu').on('click', function () {
		openMenuBurger();
	});

	// Закрытие меню при клике на крестик =======================================================================================
	$('.fixed__close').on('click', function () {
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
        var t = 1800;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
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

	// Фильтр для слайдера с видеороликами =============================================================================
	let filter = $("[data-filter]");

	filter.on("click", function(event) {
		event.preventDefault();
		
		let cat=$(this).data('filter');

		if (cat=='all') {
			$("[data-cat]").removeClass('hide')
		} else {
			$("[data-cat]").each(function() {

			let workCat=$(this).data('cat');

			if (workCat!=cat) {
				$(this).addClass('hide');
			} else {
				$(this).removeClass('hide');
			}
		});
		}
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
		$('.short-popup').removeClass('hide');
		$('body').addClass('blocked');
	});

	// открытие модального окна для заказа юриста
	$('.lawyer__btn, .btn-tariffs-buy').on('click', function () {
		$('.long-popup').removeClass('hide');
		$('body').addClass('blocked');
	});

	// открытие модального окна для доп. инфо-ии
	$('.info-advantage__btn').on('click', function (event) {
		event.preventDefault();
		$('.more-popup').removeClass('hide');
		$('body').addClass('blocked');
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
	$('form').submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});