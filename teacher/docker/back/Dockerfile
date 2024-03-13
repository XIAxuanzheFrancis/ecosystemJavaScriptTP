FROM node:18.12.1-alpine3.17

USER root

RUN apk update && apk add git sqlite python3 make gcc libc-dev g++ sqlite-libs jq

RUN npm install -g node-gyp-cache

RUN npm config set node_gyp node-gyp-cache

RUN npm install -g --unsafe-perm better-sqlite3@8.0.1

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]
