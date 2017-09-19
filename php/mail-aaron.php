<?php
	
	ini_set('display_errors',1);

	// Check for empty fields
	if(empty($_POST['name'])  		||
		empty($_POST['email']) 		||
		empty($_POST['message'])	||
		!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
			{
				echo "No arguments Provided!";
				return false;
			}

	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["message"];

	// set here
	$subject = "Website Contact Form:  $name";
	$to = ""; /* add email address here*/

	$headers = "From: noreply@aaroncolaco.com\r\n";
	$headers .= "Content-type: text/plain\r\n";		/* needs to be text/plain and NOT text/html so that the newline characters work. Otherwise received email is in one line */

	$headers .= "Reply-To: $email";
	
	// send the email
	mail($to, $subject, $message, $headers);

	#redirect
	header( "Location: http://aaroncolaco.com/#contact" );	//this line is important. remember to change domain if you use the script on a new domain. otherwise it won't return and carry out remaining operations after sending the email
?>
