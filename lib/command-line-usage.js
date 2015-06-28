"use strict";
var columnLayout = require("column-layout");
var o = require("object-tools");
var util = require("util");

/**
@module command-line-usage
*/
module.exports = usage;

function usage(cliOptions, options){
    options = options || {};
    cliOptions = cliOptions || [];
    if (!Array.isArray(cliOptions)){
        if (cliOptions.options && cliOptions.data){
            options = o.extend(cliOptions.options, options);
            cliOptions = cliOptions.data;
        }
    }
    
    var lines = [];
    lines.add = function(line){
        this.push("  " + line);
    };
    lines.addEmpty = function(){
        this.push("");
    };
    
    lines.addEmpty();
    lines.add(options.title);
    lines.add(options.header);
    lines.addEmpty();
    
    if (options.forms){
        lines.add("\u001b[4mUsage\u001b[0m")    
        options.forms.forEach(function(form){
            lines.add(form);
        });
        lines.addEmpty();
    }
    
    if (cliOptions.length){
        cliOptions.forEach(function(cliOption){
            lines.push({ 
                option: getOptionNames(cliOption), 
                description: cliOption.description 
            });
        });
        lines.addEmpty();
    }
    
    if (options.footer){
        lines.add(options.footer);
        lines.addEmpty();
    }
    // console.log(lines);
    return columnLayout(lines, {
        viewWidth: options.viewWidth,
        padding: {
            left: "  ",
            right: " "
        },
        columns: [
            { name: "option", nowrap: true }
        ]
    });
}

function getOptionNames(cliOption){
    var names = [];
    names.push("--" + cliOption.name);
    if (cliOption.alias) names.push("-" + cliOption.alias);
    return names.join(", ");
}
