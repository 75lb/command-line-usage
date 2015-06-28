#!/usr/bin/env node
"use strict";
var usage = require("../");
var path = require("path");

process.argv.splice(0, 2);
var file = process.argv.shift();
var cliOptions = require(path.resolve(file));

process.stdout.write(usage(cliOptions, { 
    viewWidth: process.stdout.columns
}));
