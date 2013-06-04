#!/bin/bash

SCRIPT_DIR=`dirname $0`
DIST_FILE=dist.zip
SERVER=stephenn.info
TARGET=/var/www/demo.acorn-accounts.com

cd $SCRIPT_DIR/..
grunt

scp $DIST_FILE $SERVER:.

ssh stephenn.info <<EOF
	sudo rm -r $TARGET/*
	sudo unzip $DIST_FILE -d $TARGET
	sudo chown -R www-data:www-data $TARGET
	
	rm $DIST_FILE
EOF