$('document').ready(function(event){

	$('button').on('click', function(event){
		$('.wrapper').addClass('hide-bgc');
		$('.modal-form').css({'display':'block'});
	});

	$('input[value="ПЕРЕЗВОНИТЕ МНЕ"]',).on('click', function(event){
		event.preventDefault();

		$('.wrapper').addClass('hide-bgc');
		$('.thanks').css({'display':'block'});
		$('.modal-form').css({'display':'none'});
	});

	$('img[alt="hide"]').on('click', function(){
		$('.wrapper').removeClass('hide-bgc');
		$('.thanks').hide();
		$('.modal-form').css({'display':'none'});
	});

	$('input[value="ЗАКАЗАТЬ"]',).on('click', function(){
		$('.wrapper').addClass('hide-bgc');
		$('.modal-form').css({'display':'block'});
	});

	$('.header__order',).on('click', function(event){
		event.preventDefault();
		
		$('.wrapper').addClass('hide-bgc');
		$('.modal-form').css({'display':'block'});
	});

});