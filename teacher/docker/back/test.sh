#!/usr/bin/env sh

export DB_PATH="/tmp/db.db"
export APP_PATH="/app"

rm $DB_PATH
cat /sql/data.sql | sqlite3 $DB_PATH
chmod 777 $DB_PATH
cd /test

npm install
npm run test -s