$(document).ready(function() {

	$('#form').on('submit', function(ev) {

		// prevent from auto-submitting  
		ev.preventDefault();
		ev.stopPropagation();

		// if all is good, then submit.
		sendData();

	});

	//function to send data to the PHP script
	var sendData = function() { 
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var email = $('#email').val();
		var number1 = $('#number1').val();
		var number2 = $('#number2').val();
		var company= $('#company').val();
		var designationText= $('#designationText').val();
		var message = $('#message').val();

		var name = fname + " " + lname;

		var messageToSend = "Name: " + name + "\nEmail: " + email + "\nTelephone: " +	//have to use double quotes since PHP detects  
			number1 + "\nCellphone: " + number2 + "\nCompany: " + company +			//escape sequences like \n only in double quotes
			"\nDesignation: " + designationText + "\nMessage: " + message;

		var dataString = "Name=" + name + "&Email=" + email + "&MessageToSend=" + messageToSend;

		//alert (dataString);return false; 	//uncomment to display the data that will be sent to the php script on button click

		$.ajax({
			url: "/php/mail.php",
			type: "POST",
			data: {
				name : fname,
				email : email,
				message : messageToSend
			},
			cache: false,
			complete: function() {
				$('#form').hide();
				$('#changingText').text("Hey " + fname +  "! I will be in touch with you shortly");
				$("#changingText").css('font-size', '2em');
			},
			error: function(xhr, textStatus, error){
				$('#changingText').text("Something seems to have gone wrong. How about catching me on Twitter?");
				$("#changingText").css('font-size', '2em');
				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
			},
		});
		
		return;
	};

});
