#!/bin/bash

echo "Starting thread picker"
echo "Press [CTRL+C] to stop.."

while :
do
    echo "Requesting a thread....";
    node thread-picker.js &
    wait
    sleep 10
done

echo "Done"
