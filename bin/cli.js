#!/usr/bin/env node
"use strict";
var usage = require("../");
var os = require("os");
var fs = require("fs");
var path = require("path");
var ansi = require("ansi-escape-sequences");

var tmpPath = path.join(os.tmpDir(), Date.now() + "-clu.js");

process.stdin
    .pipe(fs.createWriteStream(tmpPath))
    .on("close", getUsage);
    
function getUsage(){
    var cliOptions = require(tmpPath);
    fs.unlinkSync(tmpPath);
    console.log(usage(cliOptions));
}

function halt(msg){
    console.error(ansi.format(msg, "red"));
    process.exit(1);
}
