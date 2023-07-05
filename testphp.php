<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$redis->set('test_key', 'Hello, Redis!');
$value = $redis->get('test_key');

echo $value;

$redis->close();
