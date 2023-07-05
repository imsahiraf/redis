<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$channel = 'number_channel';

// Generate and publish numbers indefinitely
$count = 0;
while (true) {
    $redis->publish($channel, $count);
    echo "Published: $count\n";
    $count++;
    sleep(1); // Adjust the delay as per your requirement
}

$redis->close();
