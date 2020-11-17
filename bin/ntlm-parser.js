#!/usr/bin/env node

// eslint-disable-next-line node/no-unpublished-require
const {ntlmParse} = require('../build/src/index');

console.log('process.argv: ', process.argv);
console.log('process.argv[2]: ', process.argv[2]);
const object = ntlmParse(process.argv[2], {encoding: 'base64'});
console.log('object: ', object);
