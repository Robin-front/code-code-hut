#!/bin/sh

if [ ! -f 'pid']
then
  node ../pm.js ../config.json &
  echo $! > pid
fi
