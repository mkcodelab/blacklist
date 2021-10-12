<?php
$requestPayload = file_get_contents("php://input");
// var_dump($requestPayload);
$decodedJson = json_decode($requestPayload);

$encodedJson = json_encode($decodedJson);

$fp = fopen('files.json','w');
fwrite($fp,$encodedJson);
fclose($fp);

?>