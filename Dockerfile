FROM vitta/nodemon

MAINTAINER sysstas

ENV DB_CONFIG_PROD="mysql://ccadmin:chdelsss@ccdb.cyvbhrm19emn.eu-west-1.rds.amazonaws.com:3306/ccdb"
ENV TENANT="clockwiseclockwork.eu.auth0.com"

COPY . /app
VOLUME .:/app
WORKDIR /app

RUN npm install

ENTRYPOINT ["nodemon", "index.js"]
