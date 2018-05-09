#!/usr/bin/env bash

SHELL_OPTION=""

while getopts ":s:" option
do
    case $option
    in
    s)
        SHELL_OPTION="$OPTARG"
        ;;
    \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
    :)
        echo "Option -$OPTARG requires an argument." >&2
        exit 1
        ;;
    esac
done

# Text coloring
LIGHTCYAN='\033[1;96m'
RESET='\033[0m'

function infocolorecho() {
    echo $LIGHTCYAN"$@"$RESET
}

container=$(docker container ls --filter "name=$SHELL_OPTION" -q --latest)
if [ $container ]; then
    if [ $SHELL_OPTION == "react" ]; then
        docker exec -it $container /bin/sh
    else
        docker exec -it $container /bin/bash
    fi
else
    infocolorecho "$SHELL_OPTION container is not running"
    infocolorecho "Try running a \"make up\""
fi
