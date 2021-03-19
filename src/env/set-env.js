#!/bin/node
const fs = require('fs');
const env = process.argv[2];
const envFileContent = require(`./${env}.json`);

//copy the json inside the env.json file
fs.writeFileSync('./src/env/env.json', JSON.stringify(envFileContent, undefined, 2));