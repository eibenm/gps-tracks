<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', 1);

function deleteFoldersInDirectory($directory)
{
    $iterator = new \RecursiveDirectoryIterator($directory, \FilesystemIterator::SKIP_DOTS);
    $recursiveIterator = new \RecursiveIteratorIterator($iterator, \RecursiveIteratorIterator::CHILD_FIRST);

    foreach ($recursiveIterator as $fileInfo) {
        if ($fileInfo->isFile()) {
            @unlink($fileInfo->getPathName());
        } else {
            rmdir($fileInfo);
        }
    }
}

function sendResponse($success) {
    $json = json_encode($success);
    header('HTTP/1.1 200 OK');
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json');
    header('Content-Length: ' . strlen($json));
    echo $json;
    exit;
}

if (!isset($_POST['name']) || !isset($_FILES['file'])) {
    echo 'Missing post data';
    sendResponse(false);
}

// -------------------------- Upload File

$uploaddir = '/var/www/html/uploads';

if (!is_dir($uploaddir)) {
    mkdir($uploaddir, 0777);
}

deleteFoldersInDirectory($uploaddir);

$postFile = $uploaddir . DIRECTORY_SEPARATOR . basename($_FILES['file']['name']);
$postName = $_POST['name'];

if (!move_uploaded_file($_FILES['file']['tmp_name'], $postFile)) {
    echo 'File was not successfully saved.';
    sendResponse(false);
}

// -------------------------- Save record to database

$contents = file_get_contents($postFile);

$xml = new SimpleXMLElement($contents);

$featureCollection = [
    'type' => 'FeatureCollection',
    'features' => []
];

foreach ($xml->trk->trkseg->trkpt as $trkpt) {
    $lat = (float)$trkpt['lat'];
    $lon = (float)$trkpt['lon'];
    $ele = (float)$trkpt->ele;
    $time = (string)$trkpt->time;
    $featureCollection['features'][] = [
        'type' => 'Feature',
        'geometry' => [
            'type' => 'Point',
            'coordinates' => [
                $lon, $lat, $ele
            ]
        ],
        'properties' => [
            'ele' => $ele,
            'time' => $time
        ]
    ];
}

$featureCollectionString = json_encode($featureCollection);

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

// -------------------------- Insert into database

$sql = "
WITH inserted_track AS (
    INSERT INTO track (name) VALUES (:name)
    RETURNING tid AS track_id
), feature_collection AS (
    SELECT :feature_collection::json AS fc
)
INSERT INTO track_geoms (tid, geom, properties, geom_order)
SELECT
    track_id,
    ST_SetSRID(ST_GeomFromGeoJSON(feat->>'geometry'), 4326),
    feat->'properties',
    row_number() OVER ()
FROM (
    SELECT
        json_array_elements(fc->'features') AS feat,
        inserted_track.track_id
    FROM feature_collection, inserted_track
) AS f;
";

$stmt  = $pdo->prepare($sql);
$stmt->bindParam(':feature_collection', $featureCollectionString, PDO::PARAM_STR);
$stmt->bindParam(':name', $postName, PDO::PARAM_STR);
$stmt->execute();

sendResponse(true);

// -------------------------- Select from database

/*
$sql = "
SELECT jsonb_build_object(
    'type',     'FeatureCollection',
    'features', jsonb_agg(jsonb_build_object(
        'type',       'Feature',
        'geometry',   results.geom::jsonb,
        'properties', results.properties
    ))
)
FROM (
    SELECT
        ST_AsGeoJSON(geom) AS geom,
        properties AS properties
    FROM track_geoms
    WHERE tid = 1
    ORDER BY geom_order
) results;
";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$geojson = $stmt->fetchColumn();

var_dump($geojson);
print($geojson);


// Return Response

header('HTTP/1.1 200 OK');
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Max-Age: 86400');    // cache for 1 day
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');
header('Content-Length: ' . strlen($json));
echo json_encode(true);
exit;

*/