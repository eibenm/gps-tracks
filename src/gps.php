<?php

$contents = file_get_contents('Bear Canyon Loop.gpx');

$xml = simplexml_load_string($contents);

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


// file_put_contents('output.json', json_encode($featureCollection));

$host = 'dns-postgres';
$db = 'docker';
$username = 'docker';
$password = 'docker';

$dsn = "pgsql:host=$host;port=5432;dbname=$db;";

$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $opt);
} catch (PDOException $e) {
    die("Error connection to database: {$e->getMessage()}");
}

var_dump($pdo);

$stmt = $pdo->prepare(<<<SQL

    WITH feature_collection AS (
        SELECT :feature_collection::json AS fc
    )
    INSERT INTO track_geoms (tid, geom, properties, geom_order)
    SELECT
        1,
        ST_SetSRID(ST_GeomFromGeoJSON(feat->>'geometry'), 4326),
        feat->'properties',
        row_number() OVER ()
    FROM (
        SELECT json_array_elements(fc->'features') AS feat
        FROM feature_collection
    ) AS f;

SQL
)->execute([
    ':feature_collection' => PDO::PARAM_STR
]);


// $db = new \PDO('pgsql:host=localhost;port=5432;dbname=testdb;user=bruce;password=mypass');
// $db->setAttribute(PDO::SQLSRV_ATTR_ENCODING, PDO::SQLSRV_ENCODING_SYSTEM);

// $db->prepare('TRUNCATE TABLE properties_temp;')->execute() or die(print_r($db->errorInfo(), true));

// $n = 0;

// if (($handle = fopen('geocoding_result.csv', 'r')) !== false)
// {
//     $headers = fgetcsv($handle);
//     $col_status = array_search('status', $headers);
//     $col_score = array_search('score', $headers);
//     $col_pid = array_search('pid', $headers);
//     $col_city = array_search('city_1', $headers);
//     $col_state = array_search('state', $headers);
//     $col_zip = array_search('zip', $headers);
//     $col_lat = array_search('SHAPE@Y', $headers);
//     $col_long = array_search('SHAPE@X', $headers);

//     while (($data = fgetcsv($handle)) !== false)
//     {
//         $sql = '
//         INSERT INTO properties_temp (status, score, pid, city, state, zip, lat, long)
//         VALUES (:status, :score, :pid, :city, :state, :zip, :lat, :long);';

//         $stmt  = $db->prepare($sql);
//         $stmt->bindParam(':status', $data[$col_status]);
//         $stmt->bindParam(':score', $data[$col_score]);
//         $stmt->bindParam(':pid', $data[$col_pid]);
//         $stmt->bindParam(':city', $data[$col_city]);
//         $stmt->bindParam(':state', $data[$col_state]);
//         $stmt->bindParam(':zip', $data[$col_zip]);
//         $stmt->bindParam(':lat', $data[$col_lat]);
//         $stmt->bindParam(':long', $data[$col_long]);
//         $stmt->execute() or die(print_r($db->errorInfo(), true));
//         $n++;
//     }

//     fclose($handle);
// }

// echo '<h2>' . strval($n) . ' rows have been imported!</h2>';
