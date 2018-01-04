<?php

// dev
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', 1);

$contents = file_get_contents('Bear Canyon Loop.gpx');

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

// file_put_contents('output.json', $featureCollectionString);

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

$pdo = new PDO($dsn, $username, $password, $opt);

// Insert into database

$sql = "
WITH inserted_track AS (
    INSERT INTO track (name) VALUES ('my track')
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
$stmt->execute();

// Select from database

$sql = "
SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(json_build_object(
        'type', 'Feature',
        'geometry', results.geom::json,
        'properties', results.properties::json
    ))
)
FROM (
    SELECT
        ST_AsGeoJSON(geom) AS geom,
        properties AS properties
    FROM track_geoms
    WHERE tid = (SELECT tid FROM track ORDER BY tid DESC LIMIT 1)
    ORDER BY geom_order
) results;
";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$geojson = $stmt->fetchColumn();

var_dump($geojson);
print($geojson);
