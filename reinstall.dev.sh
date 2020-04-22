#!/bin/sh
sudo docker-compose stop
sudo docker-compose rm
export $(egrep -v '^#' .env | xargs)
sudo docker volume rm $CONTAINER_NAME-files $CONTAINER_NAME-postgres-data
sudo docker-compose up postgres
