#!/bin/bash

echo "Starting tweet backups"
echo "Press [CTRL+C] to stop.."

while :
do
    echo "Requesting a tweet....";
    node tweet-backups.js $1 &
    wait
    sleep 10
done

echo "Done"
