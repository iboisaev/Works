const header = $('.header');

function changingHeader() {
	if ($(window).scrollTop() > 50) {
		header.addClass('scroll');
	} else {
		header.removeClass('scroll');
	}
}

// For changing bg color of header on scrolling
window.addEventListener('scroll', changingHeader);
window.addEventListener('load', changingHeader);