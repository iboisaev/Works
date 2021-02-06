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
