<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', 1);

function sendResponse($rows) {
    $json = json_encode($rows);
    header('HTTP/1.1 200 OK');
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json');
    header('Content-Length: ' . strlen($json));
    echo $json;
    exit;
}

// -------------------------- Setting up PDO

$host = 'dns-postgres';
$db = 'docker';
$username = 'docker';
$password = 'docker';

$dsn = "pgsql:host={$host};port=5432;dbname={$db};";

$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$pdo = new PDO($dsn, $username, $password, $opt);

// -------------------------- Select from database

$sql = "
SELECT
    t.tid AS id,
    t.name,
    ST_AsGeoJSON(ST_MakeLine(g.geom ORDER BY g.geom_order)) AS geojson
FROM track t
JOIN track_geoms g ON t.tid = g.tid
GROUP BY t.name, t.tid
ORDER BY t.name ASC, t.tid ASC;
";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll();

// Return Response

sendResponse($rows);
