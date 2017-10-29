$(function() {
	$('#popup').hide();
	$('#hide-layout').css({
		opacity: .8
	});
	alignCenter($('#popup'));
	$(window).resize(function() {
		alignCenter($('#popup'));
	})
	$('#click-me').click(function() {
		$('#hide-layout, #popup').fadeIn(500);
	})
	$('#btn-close, #hide-layout').click(function() {
		$('#hide-layout, #popup').fadeOut(500);
	})

	function alignCenter(elem) {
		elem.css({
			left: ($(window).width() - elem.width()) / 2 + 'px',
			top: ($(window).height() - elem.height()) / 2 + 'px'
		})
	}
})