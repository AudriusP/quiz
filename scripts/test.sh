#!/bin/sh

for FILE in $*; do
  mocha $FILE;
done
