<?php

// require 'dbconfig.php';

// $dsn = "pgsql:host=$host;port=5432;dbname=$db;";

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


$host = 'dns-postgres';
$db = 'docker';
$username = 'docker';
$password = 'docker';

$dsn = "pgsql:host=$host;port=5432;dbname=$db;user=$username;password=$password";
 
try {
	// create a PostgreSQL database connection
	$pdo = new PDO($dsn);
 
	// display a message if connected to the PostgreSQL successfully
	if($pdo){
		print "Connected to the $db database successfully!\n\n";
	}
} catch (PDOException $e) {
	// report error message
	printf("%s\n", $e->getMessage());
}