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