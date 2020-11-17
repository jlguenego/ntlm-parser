#!/usr/bin/env node

// eslint-disable-next-line node/no-unpublished-require
const {ntlmParseFromCmdLine} = require('../build/src/cmdLine');

const object = ntlmParseFromCmdLine();
console.log('object: ', object);
