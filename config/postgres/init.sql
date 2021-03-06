-- SQL SETUP SCRIPT

-- create users
CREATE USER docker WITH SUPERUSER PASSWORD 'docker';

-- create database
CREATE DATABASE docker
    WITH 
    OWNER = docker;

-- grant permissions
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
GRANT ALL PRIVILEGES ON DATABASE docker TO meiben;

\connect docker

-- install postgis extension
CREATE EXTENSION postgis;

-- create tables

CREATE TABLE track (
    tid     integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name    varchar(100) NOT NULL CHECK (name <> '')
);

CREATE TABLE track_geoms (
    gid        integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    tid        integer REFERENCES track(tid) ON DELETE CASCADE,
    geom       geometry(POINTZ, 4326) NOT NULL,
    properties jsonb NOT NULL,
    geom_order integer NOT NULL
);

-- TODO:
-- need to apply geospatial index
-- need to apply json index
