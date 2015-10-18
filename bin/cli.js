#!/usr/bin/env node
'use strict'
var usage = require('../').getUsage
var path = require('path')

var filePath = process.argv[2]
if (!filePath) {
  console.error('$ command-line-usage <file>')
  process.exit(1)
}

var cliOptions = require(path.resolve(filePath))
console.log(usage(cliOptions.definitions, cliOptions.options))
