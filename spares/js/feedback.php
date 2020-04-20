<?php 
	$mark = $_POST['mark'];
	$model = $_POST['model'];
	$year = $_POST['year'];
	$details = $_POST['details'];
	$big_f_name = $_POST['big_form_name'];
	$big_f_phone = $_POST['big_form_phone'];
	$big_f_email = $_POST['big_form_email'];

	$subject = "=?utf-8?B?".base64_encode("Message from cite")."?=";
	$headers = "From: $big_f_email\r\nReply-to: $big_f_email\r\nContent-type: text/html; charset=utf-8\r\n";

	$success = mail('iboisaev@mail.ru', $subject, $details, $headers);
	echo $success;
?>