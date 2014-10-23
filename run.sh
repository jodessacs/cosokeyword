#! /bin/bash

cd public && grunt build && cd ..
node app/index.js

