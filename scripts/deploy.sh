#!/bin/bash

SCRIPT_DIR=`dirname $0`

SERVER=stephenn.info
TARGET=projects/passwordSafeUI

if [[ -z "$1" ]]; then
	echo "usage: deploy.sh dist.zip"
	exit 0
fi

scp $1 $SERVER:.
DIST_FILE=`basename $1`

ssh stephenn.info <<EOF
	mkdir -p $TARGET/dist
	unzip $DIST_FILE -d $TARGET/new
	mv $TARGET/new $TARGET/dist

	rm $DIST_FILE
EOF