FROM ubuntu:18.04

RUN  apt-get update \
  && apt-get install -y gnupg2 \
  && rm -rf /var/lib/apt/lists/*

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8 \
    && apt-key adv --export --armor B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8|apt-key add -

# Add PostgreSQL's repository.
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

# Install postgres and postgis
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        postgresql-12 \
        postgresql-12-postgis-3 \
        postgresql-12-postgis-3-scripts \
    && rm -rf /var/lib/apt/lists/*

COPY init.sql /usr/local/bin/init.sql

# Run the rest of the commands as the `postgres` user
USER postgres

RUN /etc/init.d/postgresql start \
    && psql -f "/usr/local/bin/init.sql"

RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/12/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/12/main/postgresql.conf

EXPOSE 5432

# CMD ["/etc/init.d/postgresql", "start"]

CMD [\
    "/usr/lib/postgresql/12/bin/postgres"\
        ,"-D", "/var/lib/postgresql/12/main"\
        ,"-c", "config_file=/etc/postgresql/12/main/postgresql.conf" \
]
