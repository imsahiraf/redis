<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

function generateRandomKey()
{
    return uniqid('key_', true);
}

function generateRandomNumber()
{
    return rand(1, 100);
}

function updateRedisData()
{
    global $redis;

    $keys = $redis->keys('*');

    if (count($keys) >= 20) {
        return;
    }

    $numKeys = rand(5, 10);
    $remainingKeys = 20 - count($keys);

    if ($numKeys > $remainingKeys) {
        $numKeys = $remainingKeys;
    }

    for ($i = 0; $i < $numKeys; $i++) {
        $key = generateRandomKey();
        $number = generateRandomNumber();

        $redis->set($key, $number);
    }
}

// Update Redis data every 334 milliseconds
while (true) {
    updateRedisData();
    usleep(334000);
}
