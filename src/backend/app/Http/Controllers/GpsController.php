<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GpsController extends Controller
{
    const FILE_UPLOAD_DIR = '/var/www/html/uploads';

    const SQL_INSERT = "
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

    const SQL_GET = "
    SELECT
        t.tid AS id,
        t.name,
        ST_AsGeoJSON(ST_MakeLine(g.geom ORDER BY g.geom_order)) AS geojson
    FROM track t
    JOIN track_geoms g ON t.tid = g.tid
    GROUP BY t.name, t.tid
    ORDER BY t.name ASC, t.tid ASC;
    ";

    /**
     * Instantiate a new GpsController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Assign Cors middleware
        $this->middleware('cors', ['only' => [
            'new',
            'get',
        ]]);
    }

    /**
     * Store a new gps model
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function new(Request $request)
    {
        if (!$request->has('name') || !$request->hasFile('file')) {
            return response()->json(['error' => 'Wrong request parameters'], 400);
        }

        $name = $request->input('name');
        $file = $request->file('file');

        $xml = new \SimpleXMLElement($file->get());

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

        $pdo = app('db')->getPdo();
        $stmt  = $pdo->prepare(self::SQL_INSERT);
        $stmt->bindParam(':feature_collection', $featureCollectionString, \PDO::PARAM_STR);
        $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
        $stmt->execute();

        return response()->json(true);
    }

    /**
     * Get a list of gps models`
     * 
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
        $pdo = app('db')->getPdo();
        $stmt = $pdo->prepare(self::SQL_GET);
        $stmt->execute();
        $rows = $stmt->fetchAll();

        return response()->json($rows);
    }
}
