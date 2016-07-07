$(document).ready(function() {

	$('#form').on('submit', function(ev) {

		// prevent from auto-submitting  
		ev.preventDefault();
		ev.stopPropagation();

		// if all is good, then submit.
		sendData();

	});

	var validateEmail = function (email) {
		var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		
		return regex.test(email);
	}

	//function to send data to the PHP script
	var sendData = function() { 
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var email = $('#email').val();
		var number1 = $('#number1').val();
		var number2 = $('#number2').val();
		var company= $('#company').val();
		var designationText= $('#designation').val();
		var message = $('#message').val();

		if (!fname.trim() || !lname.trim() || !email.trim() || !message.trim()) {
			$('#changingText').text("Please fill all required fields");
			$("#changingText").css('font-size', '2em');
			$('html, body').animate({
					scrollTop: $("#contact").offset().top
				}, 500);
			return;
		};

		if (!validateEmail(email)) {
			$('#changingText').text("Invalid Email");
			$("#changingText").css('font-size', '2em');
			$('#email').focus();
			$('html, body').animate({
			        scrollTop: $("#contact").offset().top
			    }, 500);
			return;
		};


		var name = fname + " " + lname;

		var messageToSend = "Name: " + name + "\nEmail: " + email + "\nTelephone: " +	//have to use double quotes since PHP detects  
			number1 + "\nCellphone: " + number2 + "\nCompany: " + company +			//escape sequences like \n only in double quotes
			"\nDesignation: " + designationText + "\nMessage: " + message;

		var dataString = "Name=" + name + "&Email=" + email + "&MessageToSend=" + messageToSend;

		//alert (dataString);return false; 	//uncomment to display the data that will be sent to the php script on button click

		$.ajax({
			type: "post",
			url: "http://hype-entertainment.com/php/mail-aaron.php",
			data: {
				"name" : fname,
				"email" : email,
				"message" : messageToSend
			},
			cache: false,
			complete: function() {
				$('#form').hide();
				$('#changingText').text("Hey " + fname +  "! I will be in touch with you shortly");
				$("#changingText").css('font-size', '2em');
			},
			error: function(xhr, textStatus, error){
				$('#form').hide();
				$('#changingText').text("My mail server seems to be broken. How about catching me on Twitter?");
				$("#changingText").css('font-size', '3em');
				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
			},
		});
		
		return;
	};

});
