"use strict";
var columnLayout = require("column-layout");
var o = require("object-tools");
var util = require("util");
var ansi = require("ansi-escape-sequences");
var a = require("array-tools");

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
    if (options.title) lines.add(ansi.format(options.title, "underline"));
    if (options.header) lines.add(options.header);
    if (options.title || options.header) lines.addEmpty();

    if (options.forms){
        options.forms = a.arrayify(options.forms);
        lines.add(ansi.format("Usage", "underline"));
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

    return columnLayout(lines, {
        viewWidth: options.viewWidth || process.stdout.columns,
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
    var type = cliOption.type ? cliOption.type.name.toLowerCase() : ""
    if (type) type = type === "boolean" ? "" : " <" + type + ">";

    if (cliOption.alias) names.push("-" + cliOption.alias);
    names.push("--" + cliOption.name + type);
    return names.join(", ");
}
