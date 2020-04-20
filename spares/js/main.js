$(document).ready(function(){

    $('a[href="#big-form"], *[data-href^="#"]').on('click', function(e){//Плавная прокрутка якоря--------------------------
        e.preventDefault();
        var t = 1300;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
    });//Плавная прокрутка якоря------------------------------------------------



    $('input[type="tel"]').mask('+7 (999) 999-99-99');//маска для полей ввода-----------------------


    $('.showShortOrder').on('click', function(e){   // открыть по кнопке----------------
    	e.preventDefault();
    	$('.short-order').fadeIn();
    	$('body').toggleClass('locked');
    });
    $('.pop-up__close').on('click', function() {  // закрыть на крестик-----------------
    	$('.pop-up').fadeOut();
    	$('body').removeClass('locked');
    });


    $(document).mouseup(function (e) {    // закрыть по клику вне окна-------------------------
		var popup = $('.pop-up__row');
		if (e.target!=popup[0]&&popup.has(e.target).length === 0){
			$('.pop-up').fadeOut();	
			$('body').removeClass('locked');
		}
	});


	$('.order').on('click', function(e) {  // открыть по кнопке----------------
		e.preventDefault();
		$('.long-order').fadeIn();
		$('body').toggleClass('locked');
	});


	 // ajax для подробной заявки ----------------
	 $('.big-form__btn, .consultation__btn, #long_order_btn, #short_order_btn').on('click', function() {
	 	$('#consultation-form, #big_f, .pop-up__long-form, .pop-up__short-form').trigger('reset');
 		$('.thanks').fadeIn();
 		setTimeout(function(){ //
 			$('.thanks').fadeOut();
 		},3000);
	 });
	 $('#long_order_btn, #short_order_btn').on('click', function() {
 		$('.short-order').fadeOut();
 		$('.long-order').fadeOut();
	 });
});
