<?php
    require 'configDB.php';

    $result = $db->query("SELECT * FROM news ORDER BY date DESC"); 
    
    $news = $result->fetchAll(PDO::FETCH_ASSOC);
    $response = [
        "status" => true,
        "news" => $news
    ];
    echo json_encode($response);
?>