// native js ============================================================================
// Preloader
window.addEventListener("load", function() {
	const preloader = doc.querySelector('.preloader');
	setTimeout(function() {
		preloader.classList.add("done");
	}, 1000);
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

// Dark mode
mode.forEach(function(item) {
	item.addEventListener('click', function(e) {
		e.preventDefault();
		body.classList.toggle('dark');
	});
});

// dark mode saving on reload
if (localStorage.getItem('mode') === 'dark') {
	body.classList.toggle('dark');
}

// code block for tabs
if (tab) {
	tab.forEach(function(item) {
	    item.addEventListener('click', function(event) {
	        const itemActive = document.querySelector('.tab--active');
	        const tabBodyActive = document.querySelector('.tab-body--active');

	        if (!event.target.classList.contains('tab--active')) {
	            itemActive.classList.remove('tab--active');
	            item.classList.add('tab--active');
	            tabBodyActive.classList.remove('tab-body--active');

	            tabBody.forEach(function(itemBody) {
	                if (itemBody.dataset.tabBody === item.dataset.tab) {
	                    itemBody.classList.add('tab-body--active');
	                }
	            });

	        }

	    });
	});
}

// script for input type = file and label 
let inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, function(input) {
	let label = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener('change', function(e) {
		let fileName = '';
		if (this.files && this.files.length > 1) {
			fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		} else
			fileName = e.target.value.split( '\\' ).pop();

		if (fileName) {
			label.querySelector('span').innerHTML = fileName;
		} else
			label.innerHTML = labelVal;
	});
});


// script for input type of range
let range = document.getElementById('myRange'),
	output = document.getElementById('valueRange');

output.innerHTML = range.value;

range.oninput = function() {
	output.innerHTML = this.value;
};

range.addEventListener('mousemove', function() {
	let x = range.value;
	let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214, 214, 214)' + x + '%)';
	range.style.background = color;
});


// for popups
// открытие попава при нажатии на кнопки с классом .btns
btns.addEventListener('click', function() {
	popupOpen(callbackPopup);
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





// filter ============================================================================
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

 
// Плавная прокрутка якоря JQuery ===========================================================
$('a[href="#big-form"], *[data-href^="#"]').on('click', function(e){
    e.preventDefault();
    var t = 1300;
    var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
    $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
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

// скрипт для закрытия меню бургера при клике на ссылки меню
navLink.click(function () {
	if ($(window).width() <= 767) {
		toggleMenuBurger();    
	}
});