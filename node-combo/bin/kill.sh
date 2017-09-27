#!/bin/sh

if [ ! 'pid']
then
  kill $(tr -d '\r\n' < pid)
  rm pid
fi
