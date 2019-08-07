#!/bin/sh

export DOTHINGS_MONGO_URI="mongodb://$(cat /run/secrets/app_db_user):$(cat /run/secrets/app_db_pass)@mongodb:27017/dothingsdb"
export DOTHINGS_API_SECRET_KEY="$(cat /run/secrets/api_secret_key)"

node /app/server.js