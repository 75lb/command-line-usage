"use strict";
var columnLayout = require("column-layout");
var o = require("object-tools");
var util = require("util");
var ansi = require("ansi-escape-sequences");
var a = require("array-tools");
var t = require("typical");

/**
@module command-line-usage
*/
module.exports = usage;

/**
@param {cliOption[]} - the CLI options
@param options {object} - Options
@param [options.title] {string}
@param [options.description] {string}
@param [options.forms] {string|string[]}
@param [options.groups] {object} - if you have groups, only names specified here will appear in the output
@param [options.footer] {string}
@param [options.hide] {string|string[]}
@returns {string}
@alias module:command-line-usage
*/
function usage(cliOptions, options){
    options = options || {};
    options.hide = a.arrayify(options.hide);
    cliOptions = cliOptions || [];

    if (!Array.isArray(cliOptions)){
        if (cliOptions.options && cliOptions.data){
            options = o.extend(cliOptions.options, options);
            cliOptions = cliOptions.data;
        }
    }

    /* skip hidden options */
    if (options.hide.length){
        cliOptions = cliOptions.filter(function(option){
            return !a(options.hide).contains(option.name);
        });
    }

    var lines = [];
    lines.addLine = function(line){
        this.push("  " + line);
    };
    lines.addRow = function(cliOption){
        lines.push({
            option: getOptionNames(cliOption),
            description: cliOption.description
        });
    };
    lines.addEmpty = function(){
        this.push("");
    };

    lines.addEmpty();
    if (options.title) lines.addLine(ansi.format(options.title, "underline"));
    if (options.description) lines.addLine(options.description);
    if (options.title || options.description) lines.addEmpty();

    if (options.forms){
        options.forms = a.arrayify(options.forms);
        lines.addLine(ansi.format("Usage", "underline"));
        options.forms.forEach(function(form){
            lines.addLine(form);
        });
        lines.addEmpty();
    }
    
    if (cliOptions.length){
        if (options.groups){
            o.each(options.groups, function(val, group){
                var title, description;
                if (t.isObject(val)){
                    title = val.title;
                    description = val.description;
                } else if (typeof val === "string"){
                    title = val;
                } else {
                    throw ("Unexpected group type");
                }
                lines.addLine(ansi.format(title, "underline"));
                if (description){
                    lines.addLine(description);
                    lines.addEmpty();
                }
                a(cliOptions).where({ "+group": group }).forEach(lines.addRow);
                lines.addEmpty();
            });
        } else {
            cliOptions.forEach(lines.addRow);
            lines.addEmpty();
        }
    }

    if (options.footer){
        lines.addLine(options.footer);
        lines.addEmpty();
    }

    var output = columnLayout(lines, {
        viewWidth: options.viewWidth || process.stdout.columns,
        padding: {
            left: "  ",
            right: " "
        },
        columns: [
            { name: "option", nowrap: true }
        ]
    });
    output = output.replace(/\n\n$/, "\n");
    return output;
}

function getOptionNames(cliOption){
    var names = [];
    var type = cliOption.type ? cliOption.type.name.toLowerCase() : "";
    var multiple = cliOption.multiple ? "[]" : "";
    if (type) type = type === "boolean" ? "" : " <" + type + multiple + ">";

    if (cliOption.alias) names.push("-" + cliOption.alias);
    names.push("--" + cliOption.name + type);
    return names.join(", ");
}
