#!/usr/bin/env bash

UPDATE_BREW=0
UPDATE_NODE=0

while getopts ":bnh" option
do
    case "${option}"
    in
    b) UPDATE_BREW=1;;
    n) UPDATE_NODE=1;;
    h)
      echo "Usage:"
      echo "    init -h   Display help"
      echo "    init -b   Update brew"
      echo "    init -n   Update npm and node"
      exit 0
      ;;
    \?)
      echo "Invalid Option: -$OPTARG" 1>&2
      exit 0
    esac
done

if [ $UPDATE_BREW -eq 1 ]; then
    echo "BREW!!!"
fi

if [ $UPDATE_NODE -eq 1 ]; then
    echo "NODE!!!"
fi

exit 0

# Text coloring
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

function checkBrew() {
    infocolorecho "Checking for brew..."
    missing=0; brewInstalled=`brew help` || missing=1
    if [[ $missing -ne 0 ]]; then
        errorcolorecho "This script requires the Homebrew package manager for MacOS (a.k.a brew) be installed."
        errorcolorecho "Please go to http://brew.sh/ to install brew."
        errorcolorecho "Once you have installed brew, rerun this script."
        exit 1
    fi
    infocolorecho "Checking for brew...done"
}

function updateBrew() {
    infocolorecho "Updating brew..."
    brew update
    which brew
    brew --version
    infocolorecho "Updating brew...done"
}

function checkDockerForMac() {
    infocolorecho "Checking docker for mac..."
    if [[ ! -d "/Applications/Docker.app" ]]; then
        errorcolorecho "this applicaiton requires Docker for Mac be installed."
        errorcolorecho "Please go to https://docs.docker.com/docker-for-mac/install to install Docker for Mac."
        errorcolorecho "Once you have installed Docker for Mac, rerun this script."
        exit 1
    fi
    which docker
    docker --version
    infocolorecho "Checking docker for mac...done"
}

function checkNpm() {
    infocolorecho "Checking for npm..."
    missing=0; brewInstalled=`npm help` || missing=1
    if [[ $missing -ne 0 ]]; then
        errorcolorecho "This script requires Node/NPM for MacOS be installed."
        errorcolorecho "Please go to https://nodejs.org/en/download/ to install node."
        errorcolorecho "Once you have installed node, rerun this script."
        exit 1
    fi
    infocolorecho "Checking for npm...done"
}

function updateNpm() {
    infocolorecho "Updating npm..."
    sudo npm install npm@latest -g
    which npm
    npm --version
    infocolorecho "Updating npm...done"
}

function updateNode() {
    infocolorecho "Updating node..."
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    which node
    node --version
    infocolorecho "Updating node...done"
}

# Main script execution

successcolorecho "Setting up for local development..."

# Not using brew to manage npm
# checkBrew
# updateBrew

checkDockerForMac

# No need for these ... running npm in docker
checkNpm
updateNpm
updateNode

docker image prune --force

make run

successcolorecho "Setting up for local development...done"
