<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$channel = 'number_channel';

// Subscribe to the channel
$redis->subscribe([$channel], function ($redis, $channel, $message) {
    // The $message parameter contains the received message
    echo "Received: $message\n";
});

// This line won't be executed until the subscriber is terminated
