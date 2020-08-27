// filter ============================================================================
// $(function() {
	var filter = $("[data-filter]");

	filter.on("click", function(event){
		event.preventDefault();
		
		var cat = $(this).data('filter');

		if (cat == 'all') {
			$("[data-cat]").removeClass('hide')
		} else {
			$("[data-cat]").each(function(){

			var workCat = $(this).data('cat');

			if (workCat != cat) {
				$(this).addClass('hide');
			} else {
				$(this).removeClass('hide');
			}
		});
		}
	});
// });



$(document).ready(function(){

	// Плавная прокрутка якоря ===========================================================
    $('a[href="#big-form"], *[data-href^="#"]').on('click', function(e){
        e.preventDefault();
        var t = 1300;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
    });

    // маска для полей ввода =============================================================
    $('input[type="tel"]').mask('+7 (999) 999-99-99');

});



// script for input type = file and label ==================================================================
var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\\' ).pop();

		if( fileName )
			label.querySelector( 'span' ).innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
});

//E-mail Ajax Send ==========================================================================================================
	$('.popup__form').submit(function() {
		let th = $(this);
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data: th.serialize()
		}).done(function() {
			popupClose(callbackPopup);
			th.trigger("reset");
			setTimeout(function() {
				popupOpen(thanksPopup);	
			}, timeout);
			setTimeout(function() {
				popupClose(thanksPopup);
			}, 4000);
		});
		return false;
	});

// скрипт для меню бургера =============================================================================
	// скрипт для закрытия меню бургера при клике на ссылки меню
	navLink.click(function () {
		if ($(window).width() <= 767) {
			toggleMenuBurger();    
		}
	});


// for popups ============================================================================================
	// открытие попава при нажатии на кнопки с классом .btns
	btns.click(function () {
		popupOpen(callbackPopup);
	});

	// закрытие попава при нажатии на кнопки с классом .popup__close
	closePopup.click(function (e) {
		e.preventDefault();
		popupClose(callbackPopup);
	});

	// закрытие попава при нажатии вне попапа (затемненный фон)
	popup.click(function (e) {
		if (!e.target.closest('.popup__body')) {
			popupClose(callbackPopup);
		}
	});

	// закрытие попава при нажатии на кнопку Esc на клавиатуре
	$(document).keydown(function (e) {
		if (e.which === 27) {	
			popupClose(callbackPopup);
		}
	});