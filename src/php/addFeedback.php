<?php
    $name = $_POST['name'];
    $address = $_POST['address'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    require 'configDB.php';

    if (mb_strlen($name) > 255) {
        $response = [
            "status" => false,
            "message" => "*Слишком длинное ФИО!",
            "fields" => ["name"]
        ];
        echo json_encode($response);
        die();
    } else if (mb_strlen($address) > 300) {
        $response = [
            "status" => false,
            "message" => "*Слишком длинный адрес!",
            "fields" => ["address"]
        ];
        echo json_encode($response);
        die();
    }  else if (mb_strlen($email) > 100) {
        $response = [
            "status" => false,
            "message" => "*Слишком длинный E-mail!",
            "fields" => ["email"]
        ];
        echo json_encode($response);
        die();
    } else {
        $result = $db->prepare(
            "INSERT INTO `feedback` (`name`, `address`, `tel`, `email`) VALUES (:name, :address, :tel, :email)"); 
        
        $result->execute([':name' => $name, ':address' => $address, ':tel' => $tel, ':email' => $email]);
    
        $response = [
            "status" => true,
            "name" => $name,
            "address" => $address,
            "tel" => $tel,
            "email" => $email
        ];
        echo json_encode($response);
    } 
?>