"use strict";
var columnLayout = require("column-layout");
var o = require("object-tools");
var a = require("array-tools");
var util = require("util");
var ansi = require("ansi-escape-sequences");
var t = require("typical");
var UsageOptions = require("./usage-options");
var arrayify = require("array-back");

/**
Exports a single function to generate a usage guide using [column-layout](http://github.com/75lb/column-layout).

@module command-line-usage
*/
module.exports = getUsage;

/**
@param {optionDefinition[]} - an array of [option definition](https://github.com/75lb/command-line-args#exp_module_definition--OptionDefinition) objects. In addition to the regular definition properties, command-line-usage will look for:

- `description` - a string describing the option.
- `typeLabel` - a string to replace the default type string (e.g. `<string>`). It's often more useful to set a more descriptive type label, like `<ms>`, `<files>`, `<command>` etc. 

@param options {module:usage-options} - see [UsageOptions](#exp_module_usage-options--UsageOptions).
@returns {string}
@alias module:command-line-usage
@example @lang off
Some example usage output: 

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/simple.png)

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/medium.png)

*/
function getUsage(definitions, options){
    options = new UsageOptions(options);
    definitions = definitions || [];

    /* filter out hidden options */
    if (options.hide && options.hide.length){
        definitions = definitions.filter(function(option){
            return !a(options.hide).contains(option.name);
        });
    }

    var lines = new Lines(options);
    lines.addEmpty();
    
    if (options.title) lines.addLine(getText(options.title, [ "underline", "bold" ]));
    if (options.description) lines.addLine(getText(options.description));
    if (options.title || options.description) lines.addEmpty();

    if (options.synopsis){
        options.synopsis = arrayify(options.synopsis);
        lines.addLine(ansi.format("Synopsis", [ "underline", "bold" ]));
        options.synopsis.forEach(function(form){
            lines.addLine(getText(form));
        });
        lines.addEmpty();
    }

    if (definitions.length){
        if (options.groups){
            o.each(options.groups, function(val, group){
                var title, description;
                if (t.isObject(val)){
                    title = val.title;
                    description = val.description;
                } else if (typeof val === "string"){
                    title = val;
                } else {
                    throw ("Unexpected group config structure");
                }
                lines.addLine(getText(title, [ "underline", "bold" ]));
                if (description){
                    lines.addLine(getText(description));
                    lines.addEmpty();
                }
                if (group === "_none"){
                    a(definitions).where({ group: undefined }).forEach(lines.addRow);
                } else {
                    a(definitions).where({ "+group": group }).forEach(lines.addRow);
                }
                lines.addEmpty();
            });
        } else {
            definitions.forEach(lines.addRow);
            lines.addEmpty();
        }
    }
    
    var output = lines.render();

    if (options.examples){
        lines = new Lines(options);
        lines.addLine(ansi.format("Examples", [ "bold", "underline" ]));
        arrayify(options.examples).forEach(lines.addLine.bind(lines));
        lines.addEmpty();
        output += lines.render();
    }

    if (options.footer){
        lines = new Lines(options);
        arrayify(options.footer).forEach(lines.addLine.bind(lines));
        lines.addEmpty();
        output += lines.render();
    }
    
    /* the footer adds an empty line - remove it if one-too-many */
    output = output.replace(/\n\s*\n$/, "\n");
    return output;
}

function getOptionNames(cliOption, optionNameStyles){
    var names = [];
    var type = cliOption.type ? cliOption.type.name.toLowerCase() : "";
    var multiple = cliOption.multiple ? "[]" : "";
    if (type) type = type === "boolean" ? "" : "[underline]{" + type + multiple + "}";
    type = ansi.format(cliOption.typeLabel || type);

    if (cliOption.alias) names.push(ansi.format("-" + cliOption.alias, optionNameStyles));
    names.push(ansi.format("--" + cliOption.name, optionNameStyles) + " " + type);
    return names.join(", ");
}

function getText(text, styleArray){
    if (t.isString(text)){
        return ansi.format(text, styleArray)
    } else if (t.isPlainObject(text)){
        return ansi.format(text.text, text.format || styleArray);
    }
}

function Lines(options){
    var lines = [];
    
    this.addLine = function(line){
        if (t.isPlainObject(line)){
            lines.push(line);
        } else {
            lines.push((typeof line === "string" ? getText(line) : ""));
        }
    };
    
    this.addRow = function(definition){
        lines.push({
            col1: getOptionNames(definition, "bold"),
            col2: getText(definition.description)
        });
    };
    
    this.addEmpty = function(){
        lines.push("");
    };
    
    this.render = function(){
        return columnLayout(lines, {
            viewWidth: options.viewWidth || process.stdout.columns,
            padding: {
                left: "  ",
                right: " "
            },
            columns: [
                { name: "col1", nowrap: true }
            ]
        });
    }
}
