<?php

$json = json_encode([
    'data' => 'This is a test'
]);

header('HTTP/1.1 200 OK');
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Max-Age: 86400');    // cache for 1 day
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');
header('Content-Length: ' . strlen($json));
echo $json;
exit;

