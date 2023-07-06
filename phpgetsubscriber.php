<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$key = 'my_number';

// Continuously retrieve and display the number from Redis
while (true) {
    $number = $redis->get($key);
    echo "Number Retrieved: $number\n";
    sleep(1);
}
