<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "b2028mllseguin@pshs.edu.ph"; // Replace with your email address
    $subject = "New message from Contact Form";
    $body = "You have received a new message from $name.\n\n".
            "Email: $email\n\n".
            "Message:\n$message";
    
    $headers = "From: $email";
    
    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your message! We will get back to you soon.";
    } else {
        echo "Sorry, something went wrong and we couldn't send your message.";
    }
}
?>
