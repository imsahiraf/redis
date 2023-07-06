<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$key = 'my_number';
$interval = 1; // Time interval in seconds

$number = 0;

// Set the number in Redis every 1 second
while (true) {
    $redis->set($key, $number);
    echo "Number Set: $number\n";
    $number++;
    sleep($interval);
}
