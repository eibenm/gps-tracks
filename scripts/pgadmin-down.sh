#!/usr/bin/env bash

LIGHTCYAN='\033[1;96m'
RESET='\033[0m'

function infocolorecho() {
    echo $LIGHTCYAN"$@"$RESET
}

# kill container, if it's already running
container=$(docker container ls --filter "name=pgadmin" -q)
if [ $container ]; then
    infocolorecho "Removing pgadmin container"
    docker container rm -f pgadmin
else
    infocolorecho "No pgadmin container to remove"
fi
