// Native JS
// Preloader
window.addEventListener("load", function() {
	const preloader = doc.querySelector('.preloader');
	setTimeout(function() {
		preloader.classList.add("done");
	}, 1300);
});

const doc = document;

// after DOMContentLoaded
doc.addEventListener('DOMContentLoaded', function () {

	// переменные const
	const body              = doc.getElementsByTagName('body')[0],
		  popup             = doc.querySelectorAll('.popup'),
		  cartPopup         = doc.querySelector('.cart-popup'),
		  closePopup        = doc.querySelectorAll('.popup__close'),
		  items             = doc.querySelector('.items'),
		  lazyAnchor        = doc.querySelectorAll('.lazy-anchor'),
		  lockPadding       = doc.querySelectorAll('.lock-padding'),
		  lockMargin        = doc.querySelectorAll('.lock-margin'),
		  timeout           = 500;

	// переменные let
	let unlock = true;

	// 
	const getData = async function(url) {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Ошибка по адресу $(url), статус ошибка $(response.status)!`);
		}
		return await response.json();
	};

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

	// Функция для создания .item
	function createItem(item) {
		const { img, name, author, genres, originalLang, classes } = item;

		const book = `
			<a href="#" class="${classes}" data-img="${img}" data-author="${author}" data-name="${name}" data-genres="${genres}" data-original-lang="${originalLang}">
			  	<span class="item__img ibg" style="background-image: url('${img}');">
			  		<span class="item__cover">
			  			<svg class="icon icon--view">
							<use xlink:href="img/icons/view.svg#view"></use>
						</svg>
			  		</span>
			  	</span>
			  	<span class="item__title">${author} - "${name}"</span>
			</a>
		`;

		items.insertAdjacentHTML('beforeend', book);
	}

	// function for all events
	function init() {
		// 
		getData('./json/books.json').then(function(data) {
			data.forEach(createItem);
		});

		// opening cart-popup after creating items
		setTimeout(function() {
			const item              = doc.querySelectorAll('.item'),
				  popupImg          = doc.querySelector('.cart-popup__img'),
				  popupTitle        = doc.querySelector('.cart-popup__title'),
				  popupName         = doc.querySelector('.cart-popup__name span'),
				  popupGenres       = doc.querySelector('.cart-popup__genres span'),
				  popupAuthor       = doc.querySelector('.cart-popup__author span'),
				  popupOriginalLang = doc.querySelector('.cart-popup__original-lang span');

			// opening popup and changing properties 
			item.forEach(item => {
				item.addEventListener('click', function(e) {
					e.preventDefault();

					const img          = this.dataset.img,
						  name         = this.dataset.name,
						  author       = this.dataset.author,
						  genres       = this.dataset.genres,
						  originalLang = this.dataset.originalLang;

					// changing properties
					popupImg.setAttribute('src', img);
					popupName.innerText         = name;
					popupTitle.innerText        = name;
					popupGenres.innerText       = genres;
					popupAuthor.innerText       = author;
					popupOriginalLang.innerText = originalLang;

					// opening popup
					popupOpen(cartPopup);
				});
			});
			
		}, 1200);

		// closing popups
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
		doc.addEventListener('keydown', function (e) {
			if (e.which === 27) {	
				popupClose(doc.querySelector('.popup.open'));
			}
		});

		// Плавная прокрутка якоря
		lazyAnchor.forEach(link => {
		    link.addEventListener('click', function(e) {
		        e.preventDefault();

		        let href = this.getAttribute('href').substring(1);
		        const scrollTarget = document.getElementById(href);
		        const topOffset = 70;
		        // const topOffset = 0; // если не нужен отступ сверху 
		        const elementPosition = scrollTarget.getBoundingClientRect().top;
		        const offsetPosition = elementPosition - topOffset;

		        window.scrollBy({
		            top: offsetPosition,
		            behavior: 'smooth',
		        });
		    });
		});
	}

	init();

});


// JQuery
$(doc).ready(function(){

	// переменные const
	const filtersTitle = $('.filters__title');
		  
	setTimeout(function() {
		// переменные let
		let countOfBooks = $('.books__right-title span');

		// store filter for each group
		var buttonFilters = {};
		var buttonFilter;
		// quick search regex
		var qsRegex;

		// init Isotope
		var $items = $('.items').isotope({
		  itemSelector: '.item',
		  percentPosition: true,
		  layoutMode: 'fitRows',
		  fitRows: {
			gutter: 12
		  },
		  sortBy: 'number',
		  sortAscending: true,
		  filter: function() {
		    var $this = $(this);
		    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
		    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
		    return searchResult && buttonResult;
		  },
		});

		var iso = $items.data('isotope');

		// fadeIn and FadeOut for filters
		filtersTitle.on('click', function() {
			let filtersBtns = $(this).next();
			$(this).toggleClass('active');
			if (filtersBtns.hasClass('open')) {
				filtersBtns.fadeOut();
			} else {
				filtersBtns.fadeIn();
			}
				filtersBtns.toggleClass('open');
		});

		// store filter for each group
		$('.filters').on( 'click', '.filters__btn', function( event ) {
		  var $this = $(this);
		  // get group key
		  var $buttonGroup = $this.parents('.button-group');
		  var filterGroup = $buttonGroup.attr('data-filter-group');
		  // set filter for group
		  buttonFilters[ filterGroup ] = $this.attr('data-filter');
		  // combine filters
		  buttonFilter = concatValues( buttonFilters );
		  // Isotope arrange
		  $items.isotope();
		  countingBooks();
		});

		// use value of search field to filter
		var $quicksearch = $('.search-items').keyup( debounce( function() {
		  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		  $items.isotope();
		  countingBooks();
		}) );

		// Функция для расчета кол-ва книг
		function countingBooks() {
			var elemsLength = $items.isotope('getItemElements').length;

			countOfBooks.text(iso.filteredItems.length);
		}

		// change is-checked class on buttons
		$('.btn-group').each( function( i, buttonGroup ) {
		  var $buttonGroup = $( buttonGroup );
		  $buttonGroup.on( 'click', 'button', function( event ) {
		    $buttonGroup.find('.is-checked').removeClass('is-checked');
		    var $button = $( event.currentTarget );
		    $button.addClass('is-checked');
		  });
		});
		  
		// flatten object by concatting values
		function concatValues( obj ) {
		  var value = '';
		  for ( var prop in obj ) {
		    value += obj[ prop ];
		  }
		  return value;
		}

		// debounce so filtering doesn't happen every millisecond
		function debounce( fn, threshold ) {
		  var timeout;
		  threshold = threshold || 100;
		  return function debounced() {
		    clearTimeout( timeout );
		    var args = arguments;
		    var _this = this;
		    function delayed() {
		      fn.apply( _this, args );
		    }
		    timeout = setTimeout( delayed, threshold );
		  };
		}

		// init function
		countingBooks();

	}, 1500);
});