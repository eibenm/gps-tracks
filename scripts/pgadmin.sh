#!/usr/bin/env bash

GREEN='\033[1;32m'
LIGHTCYAN='\033[1;96m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
RESET='\033[0m'

function infocolorecho() {
    echo $LIGHTCYAN"$@"$RESET
}

function successcolorecho() {
    echo $GREEN"$@"$RESET  
}

function alertcolorecho() {
    echo $YELLOW"$@"$RESET  
}

function errorcolorecho() {
    echo $RED"$@"$RESET
}

# pull latest image
docker pull dpage/pgadmin4:latest

# removing dangling docker images
infocolorecho "Removing dangling images"
docker image prune --force

# removing older tags of this repository
infocolorecho "Removing any older images than \"dpage/pgadmin4:latest\""
images=$(docker image ls --filter "before=dpage/pgadmin4:latest" dpage/pgadmin4 -q)
if [ $images ]; then
    docker image rm -f ${images[@]}
fi

# kill container, if it's already running
infocolorecho "Stopping existing pgadmin container, if exists"
container=$(docker container ls --filter "name=pgadmin" -q)
if [ $container ]; then
    docker container rm -f pgadmin
fi

USERNAME="user@email.com"
PASSWORD="password"
IP=$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}')

defaultArgs=(
    -e "PGADMIN_DEFAULT_EMAIL=$USERNAME" \
    -e "PGADMIN_DEFAULT_PASSWORD=$PASSWORD" \
    --name pgadmin \
    -d dpage/pgadmin4
)

docker run -p 5000:80 ${defaultArgs[@]}

successcolorecho "Pgadmin running at http://localhost:5000"
successcolorecho "Database credentials:"
alertcolorecho "\tUsername: $USERNAME"
alertcolorecho "\tPassword: $PASSWORD"
successcolorecho "Server connection info:"
alertcolorecho "\tHost addess: $IP"
alertcolorecho "\tUsername: docker"
alertcolorecho "\tPassword: docker"