#!/bin/bash

SCRIPT_DIR=`dirname $0`

SERVER=stephenn.info
TARGET=/var/www/demo.acorn-accounts.com

if [[ -z "$1" ]]; then
	echo "usage: deploy.sh dist.zip"
	exit 0
fi

scp $1 $SERVER:.
DIST_FILE=`basename $1`

ssh stephenn.info <<EOF
	sudo rm -r $TARGET/*
	sudo unzip $DIST_FILE -d $TARGET
	sudo chown -R www-data:www-data $TARGET
	
	rm $DIST_FILE
EOF