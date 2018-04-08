#!/usr/bin/env bash

container=$(docker container ls --filter "name=postgres" -q --latest)
docker exec -it $container /bin/bash -c 'psql -U postgres -d docker -c "TRUNCATE track CASCADE"'
