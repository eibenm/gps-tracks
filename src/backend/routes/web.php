<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/v1'], function () use ($router) {

    $router->get('/', function ()    {
        echo <<<EOT
API Discovery

Availible APIs:

    - api/v1/new
        This is used to create a new GPS track.
        Takes:
            'file' - File upload of GPX
            'name' - Name of uploaded file


    - api/v1/get
        This is used to get a list of existing GPS tracks.
EOT;
    });

    $router->post('/new', ['uses' => 'GpsController@new']);
    $router->get('/get', ['uses' => 'GpsController@get']);
});
