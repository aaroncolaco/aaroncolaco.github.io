$(document).ready(function(){
	var scroll_start = 0;
	var startchange = $('#change-navbar');
	var offset = startchange.offset();
	if (startchange.length){
		$(document).scroll(function() { 
				scroll_start = $(this).scrollTop();
				if(scroll_start > offset.top) {
					$(".navbar-default").css('height', '10%');
						$(".navbar-default").css('background-color', '#222222');
				} else {
						$('.navbar-default').css('background-color', 'transparent');
				}
		});
	};

	$('.navbar-toggle').click(function () {
		$(".navbar-collapse").css('background-color', '#222222');
	});

	$(".nav a").on("click", function(){
			//to hide the menu after clicking, on mobile devices
			$('.navbar-collapse').collapse('hide');
		});
});