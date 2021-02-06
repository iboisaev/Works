const mapTopOffset = $('.contacts').offset().top - 200;

$(window).bind('scroll', function () {
	const windowTop = $(this).scrollTop();

	if (windowTop > mapTopOffset) {
		$('.map').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af384c1f388e7d53a81083d39350092aceddc2754430bef390e3935f950e125e8&amp;source=constructor" width="100%" height="100%"></iframe>')
		$(window).unbind('scroll');
	}
});