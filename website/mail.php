<?php
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$name = $firstName." ".$lastName;
$email = $_POST['email'];
$subject = $_POST['subject'];
$comment = $_POST['comment'];
$message = $_POST['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "email@email.com";
$toEmail = "";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
echo "Thank You!";
$showMessage = '';
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From: '.$email."\r\n".
    $HEADER = implode('\r\n', $headers);
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();	
	$message = 'Hello,<br/>'
	. 'Name:' . $name . '<br/>'	
	. 'Message:' . $comment . '<br/><br/>';		
	mail($toEmail, $subject, $message, $headers);
	$showMessage = "Your request has been received, We will contact you soon. Thanks!";	
} else {
	$showMessage =  "Invalid email address";
}
$jsonData = array(
	"message"	=> $showMessage
);
echo json_encode($jsonData); 
?>