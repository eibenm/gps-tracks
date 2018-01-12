# DOCKER COMMANDS _______________________________________________________________________

docker-compose up -d
docker-compose down --rmi all -v

docker container inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' gpstracks_postgres_1

# PERMISSIONS ( LINUX ) _________________________________________________________________

sudo chmod -R 755 LAMP

# RUNNING INTERACTIVE CONTAINER _________________________________________________________

docker container run --rm --name test -it \
    -v ~/Documents/gps-tracks/src:/var/www/html \
    --network gpstracks_lamp-network \
    custom-php /bin/bash

# RUNNING PGADMIN 4 CONTAINER ___________________________________________________________

docker pull dpage/pgadmin4

docker run -p 5000:80 \
    -e "PGADMIN_DEFAULT_EMAIL=eibenm@gmail.com" \
    -e "PGADMIN_DEFAULT_PASSWORD=password" \
    --name pgadmin \
    -d dpage/pgadmin4

# open web browser in localhost:5000
